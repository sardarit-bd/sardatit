const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function auditLayers() {
  const chromeProc = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9229",
    "--disable-gpu",
    "--no-first-run",
    "--window-size=1440,900",
    "about:blank",
  ]);

  let targets = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      targets = await fetchJson("http://127.0.0.1:9229/json/list");
      if (targets && targets.length > 0) break;
    } catch (e) {}
  }

  const pageTarget = targets.find((t) => t.type === "page" && t.url.includes("localhost")) || targets.find((t) => t.type === "page") || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 1;
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === msgId) {
          ws.removeEventListener("message", handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  let currentLayers = [];
  ws.addEventListener("message", (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.method === "LayerTree.layerTreeDidChange") {
      if (msg.params.layers) currentLayers = msg.params.layers;
    }
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("DOM.enable");
  await send("LayerTree.enable");

  await send("Page.navigate", { url: "http://localhost:3008/" });
  await new Promise((r) => setTimeout(r, 2500));

  // 1. Measure Memory before section
  const memBefore = await send("Performance.getMetrics");
  const jsHeapBefore = await send("Runtime.evaluate", {
    expression: "performance.memory ? performance.memory.usedJSHeapSize : null",
    returnByValue: true
  });

  // Layer tree before scrolling to section
  const layersBefore = currentLayers.slice();

  // Scroll to section start
  await send("Runtime.evaluate", {
    expression: `(() => {
      const sec = document.getElementById("selected-work");
      const top = sec.getBoundingClientRect().top + window.scrollY;
      if (window.__lenis) window.__lenis.scrollTo(top, { immediate: true });
      else window.scrollTo(0, top);
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Layer tree at section start
  const layersAtStart = currentLayers.slice();

  // Scroll to middle of pinned section (Chapter 4)
  await send("Runtime.evaluate", {
    expression: `(() => {
      const sec = document.getElementById("selected-work");
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const height = sec.offsetHeight;
      if (window.__lenis) window.__lenis.scrollTo(top + height * 0.5, { immediate: true });
      else window.scrollTo(0, top + height * 0.5);
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Layer tree during scrubbing
  const layersMid = currentLayers.slice();

  // Get details of layers in section
  const sectionLayersInfo = await send("Runtime.evaluate", {
    expression: `(() => {
      const sec = document.getElementById("selected-work");
      const willChanges = Array.from(sec.querySelectorAll("[style*='willChange'], [style*='will-change'], .will-change-transform"));
      const bgNums = Array.from(sec.querySelectorAll(".text-\\\\[22vw\\\\]"));
      const cards = Array.from(sec.querySelectorAll("[class*='will-change-transform'][class*='absolute inset-y-0']"));
      return {
        willChangeCount: willChanges.length,
        bgNumsCount: bgNums.length,
        cardsCount: cards.length,
        cardStyles: cards.map(c => ({
          transform: c.style.transform,
          opacity: c.style.opacity,
          zIndex: c.style.zIndex,
          willChange: c.style.willChange
        })),
        bgNumStyles: bgNums.map(n => ({
          transform: n.style.transform,
          opacity: n.style.opacity,
          willChange: n.style.willChange
        }))
      };
    })()`,
    returnByValue: true
  });

  // Measure memory mid-scrub
  const memMid = await send("Performance.getMetrics");
  const jsHeapMid = await send("Runtime.evaluate", {
    expression: "performance.memory ? performance.memory.usedJSHeapSize : null",
    returnByValue: true
  });

  // Scroll past section
  await send("Runtime.evaluate", {
    expression: `(() => {
      const sec = document.getElementById("selected-work");
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const height = sec.offsetHeight;
      if (window.__lenis) window.__lenis.scrollTo(top + height + 500, { immediate: true });
      else window.scrollTo(0, top + height + 500);
    })()`
  });
  await new Promise((r) => setTimeout(r, 1000));

  const memAfter = await send("Performance.getMetrics");
  const jsHeapAfter = await send("Runtime.evaluate", {
    expression: "performance.memory ? performance.memory.usedJSHeapSize : null",
    returnByValue: true
  });

  const report = {
    layerCounts: {
      beforeSection: layersBefore.length,
      atSectionStart: layersAtStart.length,
      midSection: layersMid.length,
    },
    sectionElements: sectionLayersInfo.result.value,
    layersDetailsMid: layersMid.map(l => ({
      layerId: l.layerId,
      offsetX: l.offsetX,
      offsetY: l.offsetY,
      width: l.width,
      height: l.height,
      paintCount: l.paintCount,
      drawsContent: l.drawsContent,
      gpuMemoryBytes: l.gpuMemoryUsage || (l.width * l.height * 4) // RGBA estimation if not directly given
    })),
    memory: {
      jsHeapBefore: jsHeapBefore.result.value,
      jsHeapMid: jsHeapMid.result.value,
      jsHeapAfter: jsHeapAfter.result.value,
      metricsBefore: memBefore.metrics,
      metricsMid: memMid.metrics,
      metricsAfter: memAfter.metrics
    }
  };

  fs.writeFileSync("scratch/audit/layers_audit_results.json", JSON.stringify(report, null, 2));
  console.log("\n--- LAYER AUDIT REPORT ---");
  console.log(`Layer count before: ${report.layerCounts.beforeSection}, at start: ${report.layerCounts.atSectionStart}, mid: ${report.layerCounts.midSection}`);
  console.log(`Will-change elements in section: ${report.sectionElements.willChangeCount} (8 cards + 8 bgNums)`);
  console.log(`JS Heap before: ${(report.memory.jsHeapBefore / 1024 / 1024).toFixed(2)} MB, mid: ${(report.memory.jsHeapMid / 1024 / 1024).toFixed(2)} MB, after: ${(report.memory.jsHeapAfter / 1024 / 1024).toFixed(2)} MB`);

  ws.close();
  chromeProc.kill();
}

auditLayers().catch(console.error);
