const { spawn } = require('child_process');
const http = require('http');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

(async () => {
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9232',
    '--no-first-run',
    '--window-size=1440,900',
    'about:blank'
  ]);
  await sleep(1000);
  const targets = await fetchJson('http://127.0.0.1:9232/json/list');
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const msgId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === msgId) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  let currentLayers = [];
  ws.addEventListener('message', evt => {
    const msg = JSON.parse(evt.data);
    if (msg.method === 'LayerTree.layerTreeDidChange') {
      if (msg.params.layers) currentLayers = msg.params.layers;
    }
  });

  await send('LayerTree.enable');
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:3008/' });
  await sleep(2500);

  console.log('Layers outside:', currentLayers.length);

  await send('Runtime.evaluate', {
    expression: `(() => {
      const s = document.getElementById("selected-work");
      const top = s.getBoundingClientRect().top + window.scrollY;
      if (window.__lenis) window.__lenis.scrollTo(top + s.offsetHeight * 0.5, { immediate: true });
      else window.scrollTo(0, top + s.offsetHeight * 0.5);
    })()`
  });
  await sleep(1500);
  console.log('Layers mid-section:', currentLayers.length);

  ws.close();
  chromeProc.kill();
})();
