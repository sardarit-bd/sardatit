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

async function runHeaderVerification() {
  console.log("=== STARTING AUTO-HIDE NAVBAR CDP VERIFICATION ===");
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9245;
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

  const consoleErrors = [];
  client.on("Runtime.consoleAPICalled", (params) => {
    if (params.type === "error") {
      consoleErrors.push(params.args.map((a) => a.value || a.description).join(" "));
    }
  });

  const testReport = {
    checks: {},
    traceMetrics: {},
    consoleErrors: [],
  };

  // --------------------------------------------------------------------------
  // TEST 1: DESKTOP LENIS SCROLL (DOWN 800px, UP 60px, TOP=0)
  // --------------------------------------------------------------------------
  console.log("\n[Test 1] Desktop Lenis Scroll (Down 800px, Up 60px, Top=0)...");
  await client.send("Page.navigate", { url: "http://localhost:3008/" });
  await sleep(2500);

  // At top (scrollY = 0)
  const topState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    const isHeroGlass = h.className.includes("bg-transparent");
    const whiteLogo = h.querySelector("img[src*='logo-white']");
    const whiteLogoOpacity = whiteLogo ? window.getComputedStyle(whiteLogo).opacity : null;
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      pointerEvents: h.style.pointerEvents,
      isHeroGlass,
      whiteLogoOpacity,
      scrollY: window.scrollY
    };
  })()`);

  // Scroll down 800px
  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(800, { immediate: false, duration: 1.0 });
    else window.scrollTo({ top: 800, behavior: "smooth" });
  })()`);
  await sleep(1500);

  const down800State = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      pointerEvents: h.style.pointerEvents,
      scrollY: window.scrollY
    };
  })()`);

  // Scroll up 60px (from 800 to 740)
  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(740, { immediate: false, duration: 0.5 });
    else window.scrollTo({ top: 740, behavior: "smooth" });
  })()`);
  await sleep(1000);

  const up60State = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    const isSolid = h.className.includes("bg-white/90");
    const brandLogo = h.querySelector("img[src='/image/logo.png']");
    const brandLogoOpacity = brandLogo ? window.getComputedStyle(brandLogo).opacity : null;
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      pointerEvents: h.style.pointerEvents,
      isSolid,
      brandLogoOpacity,
      scrollY: window.scrollY
    };
  })()`);

  // Return to top (scrollY = 0)
  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: false, duration: 1.0 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  })()`);
  await sleep(1500);

  const returnTopState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    const isHeroGlass = h.className.includes("bg-transparent");
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      pointerEvents: h.style.pointerEvents,
      isHeroGlass,
      scrollY: window.scrollY
    };
  })()`);

  testReport.checks.lenisScroll = {
    topState,
    down800State,
    up60State,
    returnTopState,
    passed:
      topState.dataHidden === "false" &&
      topState.isHeroGlass === true &&
      down800State.dataHidden === "true" &&
      down800State.transform.includes("translateY(-100%)") &&
      down800State.pointerEvents === "none" &&
      up60State.dataHidden === "false" &&
      up60State.transform.includes("translateY(0") &&
      up60State.isSolid === true &&
      returnTopState.dataHidden === "false" &&
      returnTopState.isHeroGlass === true,
  };
  console.log("Lenis Scroll Check:", testReport.checks.lenisScroll.passed ? "PASSED" : "FAILED", testReport.checks.lenisScroll);

  // --------------------------------------------------------------------------
  // TEST 2: PREFERS-REDUCED-MOTION (NATIVE SCROLL & NO SLIDE ANIMATION)
  // --------------------------------------------------------------------------
  console.log("\n[Test 2] prefers-reduced-motion (Native Scroll & Header Stationary)...");
  await client.send("Emulation.setEmulatedMedia", {
    media: "screen",
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await client.send("Page.navigate", { url: "http://localhost:3008/" });
  await sleep(2500);

  await client.eval(`window.scrollTo(0, 800)`);
  await sleep(500);

  const reducedMotionState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      pointerEvents: h.style.pointerEvents,
      scrollY: window.scrollY
    };
  })()`);

  testReport.checks.reducedMotion = {
    reducedMotionState,
    passed:
      reducedMotionState.dataHidden === "false" &&
      !reducedMotionState.transform.includes("translateY(-100%)"),
  };
  console.log("Reduced Motion Check:", testReport.checks.reducedMotion.passed ? "PASSED" : "FAILED", testReport.checks.reducedMotion);

  // Reset emulated media
  await client.send("Emulation.setEmulatedMedia", { media: "screen", features: [] });

  // --------------------------------------------------------------------------
  // TEST 3: MEGA MENU INTERACTION ON SCROLL DOWN
  // --------------------------------------------------------------------------
  console.log("\n[Test 3] Mega menu open, then scroll down (close mega menu & hide header)...");
  await client.send("Page.navigate", { url: "http://localhost:3008/" });
  await sleep(2500);

  // Open mega menu by clicking Services dropdown button
  await client.eval(`(() => {
    const btn = document.querySelector("header nav button[aria-expanded]");
    if (btn) btn.click();
  })()`);
  await sleep(400);

  const megaMenuOpen = await client.eval(`(() => {
    const btn = document.querySelector("header nav button[aria-expanded]");
    const menu = document.querySelector("header [class*='MegaMenu'], header div.absolute.top-full");
    return {
      ariaExpanded: btn ? btn.getAttribute("aria-expanded") : null,
      menuPresent: !!menu
    };
  })()`);

  // Scroll down 400px
  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(400, { immediate: false, duration: 0.8 });
    else window.scrollTo({ top: 400, behavior: "smooth" });
  })()`);
  await sleep(1200);

  const afterScrollMegaMenu = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    const btn = document.querySelector("header nav button[aria-expanded]");
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      ariaExpanded: btn ? btn.getAttribute("aria-expanded") : null,
    };
  })()`);

  testReport.checks.megaMenuScroll = {
    megaMenuOpen,
    afterScrollMegaMenu,
    passed:
      megaMenuOpen.ariaExpanded === "true" &&
      afterScrollMegaMenu.ariaExpanded === "false" &&
      afterScrollMegaMenu.dataHidden === "true",
  };
  console.log("Mega Menu Scroll Check:", testReport.checks.megaMenuScroll.passed ? "PASSED" : "FAILED", testReport.checks.megaMenuScroll);

  // --------------------------------------------------------------------------
  // TEST 4: HEADER HOVER (NEVER HIDE WHILE HOVERED)
  // --------------------------------------------------------------------------
  console.log("\n[Test 4] Header hover state (never hide while pointer is hovering)...");
  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  })()`);
  await sleep(400);

  // Trigger native mouseenter on header element
  await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    h.dispatchEvent(new Event("mouseenter"));
  })()`);

  // Scroll down 500px
  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(500, { immediate: false, duration: 0.8 });
    else window.scrollTo({ top: 500, behavior: "smooth" });
  })()`);
  await sleep(1200);

  const hoveredScrollState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      scrollY: window.scrollY
    };
  })()`);

  testReport.checks.hoverProtection = {
    hoveredScrollState,
    passed: hoveredScrollState.dataHidden === "false",
  };
  console.log("Hover Protection Check:", testReport.checks.hoverProtection.passed ? "PASSED" : "FAILED", testReport.checks.hoverProtection);

  // Trigger native mouseleave
  await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    h.dispatchEvent(new Event("mouseleave"));
  })()`);

  // --------------------------------------------------------------------------
  // TEST 5: KEYBOARD TAB ACCESS (focusin REVEALS HIDDEN HEADER)
  // --------------------------------------------------------------------------
  console.log("\n[Test 5] Keyboard Tab access into hidden header (focusin)...");
  // Scroll down to hide header
  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(600, { immediate: false, duration: 0.6 });
    else window.scrollTo({ top: 600, behavior: "smooth" });
  })()`);
  await sleep(1000);

  const beforeFocusState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    return h.dataset.hidden;
  })()`);

  // Focus a link inside the header and dispatch focusin
  await client.eval(`(() => {
    const firstLink = document.querySelector("header[data-header-nav] a");
    if (firstLink) {
      firstLink.focus();
      firstLink.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    }
  })()`);
  await sleep(300);

  const afterFocusState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      pointerEvents: h.style.pointerEvents,
    };
  })()`);

  testReport.checks.keyboardFocus = {
    beforeFocusState,
    afterFocusState,
    passed:
      beforeFocusState === "true" &&
      afterFocusState.dataHidden === "false" &&
      afterFocusState.transform.includes("translateY(0"),
  };
  console.log("Keyboard Focus Check:", testReport.checks.keyboardFocus.passed ? "PASSED" : "FAILED", testReport.checks.keyboardFocus);

  // --------------------------------------------------------------------------
  // TEST 6: ROUTE CHANGE (REVEALS HEADER ON PATHNAME CHANGE)
  // --------------------------------------------------------------------------
  console.log("\n[Test 6] Route change reveals header...");
  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(800, { immediate: true });
    else window.scrollTo(0, 800);
  })()`);
  await sleep(500);

  // Click /works link in header
  await client.eval(`(() => {
    const worksLink = Array.from(document.querySelectorAll("header a")).find(a => a.getAttribute("href") === "/works");
    if (worksLink) worksLink.click();
  })()`);
  await sleep(1500);

  const routeChangeState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    return {
      pathname: window.location.pathname,
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
    };
  })()`);

  testReport.checks.routeChange = {
    routeChangeState,
    passed: routeChangeState.pathname === "/works" && routeChangeState.dataHidden === "false",
  };
  console.log("Route Change Check:", testReport.checks.routeChange.passed ? "PASSED" : "FAILED", testReport.checks.routeChange);

  // --------------------------------------------------------------------------
  // TEST 7: SCROLLTRIGGER PINNED SECTION OFFSETS (FEATURED WORKS START/END)
  // --------------------------------------------------------------------------
  console.log("\n[Test 7] Pinned section start/end offsets check...");
  await client.send("Page.navigate", { url: "http://localhost:3008/" });
  await sleep(2500);

  const pinInfo = await client.eval(`(() => {
    const sec = document.getElementById("selected-work");
    const st = window.ScrollTrigger ? window.ScrollTrigger.getAll().find(s => s.trigger === sec) : null;
    return {
      secOffsetTop: sec ? sec.offsetTop : null,
      secHeight: sec ? sec.offsetHeight : null,
      stStart: st ? st.start : null,
      stEnd: st ? st.end : null,
    };
  })()`);

  testReport.checks.pinnedOffsets = {
    pinInfo,
    passed: pinInfo.secOffsetTop !== null && pinInfo.stStart !== null,
  };
  console.log("Pinned Offsets Check:", pinInfo);

  // --------------------------------------------------------------------------
  // TEST 8: MOBILE VIEWPORT (<1024px) & MOBILE MENU
  // --------------------------------------------------------------------------
  console.log("\n[Test 8] Mobile Viewport (<1024px) native scroll & mobile menu...");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await client.send("Page.navigate", { url: "http://localhost:3008/" });
  await sleep(2500);

  // Scroll down 400px on mobile
  await client.eval(`window.scrollTo({ top: 400, behavior: "smooth" })`);
  await sleep(800);

  const mobileDownState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      scrollY: window.scrollY
    };
  })()`);

  // Scroll up 50px on mobile
  await client.eval(`window.scrollTo({ top: 350, behavior: "smooth" })`);
  await sleep(800);

  const mobileUpState = await client.eval(`(() => {
    const h = document.querySelector("header[data-header-nav]");
    return {
      dataHidden: h.dataset.hidden,
      transform: h.style.transform,
      scrollY: window.scrollY
    };
  })()`);

  // Open mobile menu
  await client.eval(`(() => {
    const btn = document.querySelector("header button[aria-label='Open menu']");
    if (btn) btn.click();
  })()`);
  await sleep(500);

  const mobileMenuOpenState = await client.eval(`(() => {
    const drawer = document.querySelector("div.fixed.inset-0.z-50.bg-white");
    const bodyOverflow = document.body.style.overflow;
    return {
      drawerVisible: !!drawer,
      bodyOverflow
    };
  })()`);

  testReport.checks.mobileBehavior = {
    mobileDownState,
    mobileUpState,
    mobileMenuOpenState,
    passed:
      mobileDownState.dataHidden === "true" &&
      mobileUpState.dataHidden === "false" &&
      mobileMenuOpenState.drawerVisible === true &&
      mobileMenuOpenState.bodyOverflow === "hidden",
  };
  console.log("Mobile Behavior Check:", testReport.checks.mobileBehavior.passed ? "PASSED" : "FAILED", testReport.checks.mobileBehavior);

  // Reset viewport
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // --------------------------------------------------------------------------
  // TEST 9: PERFORMANCE & REACT RENDER COUNT DURING 5S SCRIPTED SCROLL
  // --------------------------------------------------------------------------
  console.log("\n[Test 9] Header React render count & frame performance during 5s scroll...");
  await client.send("Page.navigate", { url: "http://localhost:3008/" });
  await sleep(2500);

  // Instrument Header render count & frame tracking
  await client.eval(`(() => {
    window.__headerAudit = {
      renders: 0,
      frames: [],
      lastRaf: performance.now(),
      running: true
    };

    // Mutation observer on header to catch any React re-render DOM changes
    const h = document.querySelector("header[data-header-nav]");
    if (h) {
      const observer = new MutationObserver((mutations) => {
        // Filter out our own imperative data-hidden, style, and aria-expanded
        for (const m of mutations) {
          if (m.attributeName !== "data-hidden" && m.attributeName !== "style" && m.attributeName !== "aria-expanded") {
            window.__headerAudit.renders++;
          }
        }
      });
      observer.observe(h, { attributes: true, childList: true, subtree: false });
    }

    function onFrame(now) {
      if (!window.__headerAudit.running) return;
      const delta = now - window.__headerAudit.lastRaf;
      window.__headerAudit.lastRaf = now;
      window.__headerAudit.frames.push(delta);
      requestAnimationFrame(onFrame);
    }
    requestAnimationFrame(onFrame);
  })()`);

  // Run 5s continuous scroll back and forth
  await client.eval(`(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(1200, { duration: 2.5, immediate: false });
      setTimeout(() => {
        window.__lenis.scrollTo(400, { duration: 2.5, immediate: false });
      }, 2500);
    }
  })()`);
  await sleep(5500);

  const perfMetrics = await client.eval(`(() => {
    window.__headerAudit.running = false;
    const frames = window.__headerAudit.frames.slice(2);
    frames.sort((a, b) => a - b);
    const avg = frames.reduce((s, v) => s + v, 0) / (frames.length || 1);
    const p95Idx = Math.floor(frames.length * 0.95);
    const p99Idx = Math.floor(frames.length * 0.99);
    const countGt20 = frames.filter(f => f > 20).length;
    const countGt33 = frames.filter(f => f > 33).length;

    return {
      headerRendersDuringScroll: window.__headerAudit.renders,
      totalFrames: frames.length,
      fps: avg > 0 ? (1000 / avg) : 0,
      meanDelta: avg,
      p95Delta: frames[p95Idx] || 0,
      p99Delta: frames[p99Idx] || 0,
      maxDelta: frames[frames.length - 1] || 0,
      countGt20,
      countGt33,
    };
  })()`);

  testReport.checks.performance = {
    perfMetrics,
    passed: perfMetrics.headerRendersDuringScroll <= 2 && perfMetrics.fps >= 58,
  };
  console.log("Performance Check:", testReport.checks.performance.passed ? "PASSED" : "FAILED", perfMetrics);

  testReport.consoleErrors = consoleErrors;
  fs.writeFileSync("scratch/header_autohide_test_report.json", JSON.stringify(testReport, null, 2));
  console.log("\n=== ALL HEADER TESTS COMPLETED. REPORT SAVED TO scratch/header_autohide_test_report.json ===");

  client.close();
  chromeProc.kill();
}

runHeaderVerification().catch(console.error);
