const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
    this.eventListeners = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      } else if (msg.method && this.eventListeners.has(msg.method)) {
        for (const cb of this.eventListeners.get(msg.method)) {
          cb(msg.params);
        }
      }
    };
  }

  on(event, cb) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(cb);
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(
        res.exceptionDetails.exception?.description ||
          JSON.stringify(res.exceptionDetails)
      );
    }
    return res.result?.value;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runSingleBenchmark({
  cpuThrottle = 1,
  dpr = 2,
  scrollSpeed = "normal",
  collectTrace = false,
  emptyPin = false,
}) {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9240;
  const chromeProc = spawn(chromePath, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--disable-gpu",
    "--no-first-run",
    "--window-size=1440,900",
    "about:blank",
  ]);

  let targets = null;
  for (let i = 0; i < 30; i++) {
    await sleep(250);
    try {
      targets = await fetchJson(`http://127.0.0.1:${port}/json/list`);
      if (targets && targets.length > 0) break;
    } catch (e) {}
  }

  const pageTarget = targets.find((t) => t.type === "page") || targets[0];
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Network.enable");

  if (cpuThrottle > 1) {
    await client.send("Emulation.setCPUThrottlingRate", { rate: cpuThrottle });
  }

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: dpr,
    mobile: false,
  });

  const traceChunks = [];
  if (collectTrace) {
    client.on("Tracing.dataCollected", (params) => {
      traceChunks.push(...params.value);
    });
    await client.send("Tracing.start", {
      traceConfig: {
        includedCategories: [
          "v8",
          "blink",
          "cc",
          "devtools.timeline",
          "disabled-by-default-devtools.timeline",
          "disabled-by-default-devtools.timeline.frame",
          "disabled-by-default-v8.gc",
        ],
      },
    });
  }

  const scrubNetworkRequests = [];
  let isScrubbing = false;
  client.on("Network.requestWillBeSent", (params) => {
    if (isScrubbing) {
      scrubNetworkRequests.push({
        url: params.request.url,
        type: params.type,
      });
    }
  });

  await client.send("Page.navigate", { url: "http://localhost:3008/" });
  await sleep(2500);

  if (emptyPin) {
    // Hide chapter cards and background numbers to measure empty pin floor
    await client.eval(`(() => {
      const sec = document.getElementById("selected-work");
      if (sec) {
        const stage = sec.querySelector(".overflow-hidden");
        if (stage) stage.style.display = "none";
      }
    })()`);
  }

  // Instrument page
  await client.eval(`
    window.__auditData = {
      longTasks: [],
      frames: [],
      chapterSlowFrames: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
      running: false,
      lastRaf: 0
    };

    const ltObs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__auditData.longTasks.push({
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name
        });
      }
    });
    ltObs.observe({ entryTypes: ['longtask'] });

    window.__startFrameRecording = function() {
      window.__auditData.running = true;
      window.__auditData.lastRaf = performance.now();
      const sec = document.getElementById("selected-work");
      const top = sec ? (sec.getBoundingClientRect().top + window.scrollY) : 3735;
      const height = sec ? sec.offsetHeight : 7200;

      function onFrame(now) {
        if (!window.__auditData.running) return;
        const delta = now - window.__auditData.lastRaf;
        window.__auditData.lastRaf = now;

        const scrollY = window.scrollY;
        const progress = Math.max(0, Math.min(1, (scrollY - top) / (height * 0.85)));
        const chapter = Math.min(6, Math.floor(progress * 7));

        window.__auditData.frames.push({
          time: now,
          delta,
          scrollY,
          chapter
        });

        if (delta > 20) {
          if (!window.__auditData.chapterSlowFrames[chapter]) {
            window.__auditData.chapterSlowFrames[chapter] = [];
          }
          window.__auditData.chapterSlowFrames[chapter].push({
            delta,
            time: now,
            scrollY
          });
        }

        requestAnimationFrame(onFrame);
      }
      requestAnimationFrame(onFrame);
    };
  `);

  // Target coordinates
  const secInfo = await client.eval(`(() => {
    const sec = document.getElementById("selected-work");
    return {
      top: sec.getBoundingClientRect().top + window.scrollY,
      height: sec.offsetHeight
    };
  })()`);

  const pinTop = secInfo.top;
  const pinEnd = secInfo.top + secInfo.height;

  // Jump to 300px before section
  await client.eval(`(() => {
    const startPos = Math.max(0, ${pinTop} - 300);
    if (window.__lenis) window.__lenis.scrollTo(startPos, { immediate: true });
    else window.scrollTo(0, startPos);
  })()`);
  await sleep(400);

  // Read render count before scrub
  const rendersBefore = await client.eval(`window.__projectsSectionRenders || 0`);

  // Start recording
  await client.eval(`
    window.__auditData.longTasks = [];
    window.__auditData.frames = [];
    window.__startFrameRecording();
  `);
  isScrubbing = true;

  // Scroll across pin range
  const scrollDuration = scrollSpeed === "fast" ? 2.5 : 7.0;
  await client.eval(`(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(${pinEnd}, { duration: ${scrollDuration}, immediate: false, ease: (t) => t });
    } else {
      window.scrollTo({ top: ${pinEnd}, behavior: "smooth" });
    }
  })()`);

  await sleep(Math.round(scrollDuration * 1000 + 1200));
  isScrubbing = false;

  const rendersAfter = await client.eval(`window.__projectsSectionRenders || 0`);
  const reactRendersDuringScroll = rendersAfter - rendersBefore;

  const results = await client.eval(`(() => {
    window.__auditData.running = false;
    const frames = window.__auditData.frames.slice(2);
    const deltas = frames.map(f => f.delta);
    deltas.sort((a, b) => a - b);

    const avg = deltas.reduce((s, v) => s + v, 0) / (deltas.length || 1);
    const p95Idx = Math.floor(deltas.length * 0.95);
    const p99Idx = Math.floor(deltas.length * 0.99);
    const p95 = deltas[p95Idx] || 0;
    const p99 = deltas[p99Idx] || 0;
    const countGt20 = deltas.filter(d => d > 20).length;
    const countGt33 = deltas.filter(d => d > 33).length;
    const maxDelta = deltas[deltas.length - 1] || 0;

    return {
      totalFrames: deltas.length,
      meanDelta: avg,
      fps: avg > 0 ? (1000 / avg) : 0,
      p95Delta: p95,
      p99Delta: p99,
      maxDelta,
      countGt20,
      countGt33,
      longTasks: window.__auditData.longTasks,
      chapterSlowFrames: window.__auditData.chapterSlowFrames,
    };
  })()`);

  let traceMetrics = null;
  if (collectTrace) {
    await client.send("Tracing.end");
    await sleep(800);

    let imageDecodeMs = 0;
    let styleLayoutMs = 0;
    let paintRasterMs = 0;
    let jsExecutionMs = 0;

    for (const ev of traceChunks) {
      const durMs = (ev.dur || 0) / 1000;
      const name = ev.name || "";
      if (name.includes("Decode Image") || name.includes("ImageDecode") || name.includes("decodeImage")) {
        imageDecodeMs += durMs;
      } else if (name.includes("UpdateLayoutTree") || name.includes("Layout") || name.includes("RecalculateStyles")) {
        styleLayoutMs += durMs;
      } else if (name.includes("Paint") || name.includes("RasterTask") || name.includes("CompositeLayers")) {
        paintRasterMs += durMs;
      } else if (name.includes("FunctionCall") || name.includes("V8.Execute")) {
        jsExecutionMs += durMs;
      }
    }

    traceMetrics = {
      imageDecodeMs: imageDecodeMs.toFixed(1),
      styleLayoutMs: styleLayoutMs.toFixed(1),
      paintRasterMs: paintRasterMs.toFixed(1),
      jsExecutionMs: jsExecutionMs.toFixed(1),
    };
  }

  client.close();
  chromeProc.kill();

  const scrubImageRequests = scrubNetworkRequests.filter(r => r.type === "Image" || r.url.match(/\.(png|jpg|jpeg|webp|avif)/i));
  const scrubRscRequests = scrubNetworkRequests.filter(r => r.url.includes("_rsc") || r.url.includes("?_rsc="));

  return {
    ...results,
    reactRendersDuringScroll,
    rendersBefore,
    rendersAfter,
    scrubNetworkRequestsCount: scrubNetworkRequests.length,
    scrubImageRequestsCount: scrubImageRequests.length,
    scrubRscRequestsCount: scrubRscRequests.length,
    traceMetrics,
  };
}

function calculateSpread(runs) {
  const fpsVals = runs.map(r => r.fps);
  const p95Vals = runs.map(r => r.p95Delta);
  const p99Vals = runs.map(r => r.p99Delta);
  const maxVals = runs.map(r => r.maxDelta);
  const gt20Vals = runs.map(r => r.countGt20);
  const gt33Vals = runs.map(r => r.countGt33);
  const ltVals = runs.map(r => r.longTasks.length);

  const getStats = (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    return {
      min: sorted[0],
      median: sorted[Math.floor(sorted.length / 2)],
      max: sorted[sorted.length - 1],
    };
  };

  return {
    runsCount: runs.length,
    fps: getStats(fpsVals),
    p95Delta: getStats(p95Vals),
    p99Delta: getStats(p99Vals),
    maxDelta: getStats(maxVals),
    countGt20: getStats(gt20Vals),
    countGt33: getStats(gt33Vals),
    longTasks: getStats(ltVals),
    reactRendersDuringScroll: runs[0].reactRendersDuringScroll,
    scrubImageRequests: runs[0].scrubImageRequestsCount,
    scrubRscRequests: runs[0].scrubRscRequestsCount,
  };
}

module.exports = { runSingleBenchmark, calculateSpread };
