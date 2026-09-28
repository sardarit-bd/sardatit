const { spawn } = require("child_process");
const http = require("http");

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

async function testLayers() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9235;
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
  await client.send("LayerTree.enable");

  let latestLayers = [];
  client.on("LayerTree.layerTreeDidChange", async (params) => {
    if (params && params.layers) {
      latestLayers = params.layers;
    }
  });

  await client.send("Page.navigate", { url: "http://localhost:3008/" });
  await sleep(2500);

  // Layer count at top (outside section)
  await client.eval(`window.scrollTo(0, 0)`);
  await sleep(500);
  const layersOutside = latestLayers.length;

  // Jump to mid-section (Chapter 4)
  const midScrollY = await client.eval(`(() => {
    const sec = document.getElementById("selected-work");
    const top = sec.getBoundingClientRect().top + window.scrollY;
    return top + (sec.offsetHeight * 0.5);
  })()`);

  await client.eval(`(() => {
    if (window.__lenis) window.__lenis.scrollTo(${midScrollY}, { immediate: true });
    else window.scrollTo(0, ${midScrollY});
  })()`);
  await sleep(800);
  const layersMid = latestLayers.length;

  console.log(JSON.stringify({
    layersOutside,
    layersMid,
    baselineAuditComparison: {
      baselineOutside: 12,
      baselineMidSection: 28,
      newOutside: layersOutside,
      newMidSection: layersMid,
      layerReduction: 28 - layersMid
    }
  }, null, 2));

  client.close();
  chromeProc.kill();
}

testLayers().catch(console.error);
