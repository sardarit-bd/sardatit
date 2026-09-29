const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/pc10/.gemini/antigravity-ide/brain/18d9ecee-7ada-4ee8-b91a-7a8aefa56b4f/.system_generated/logs/transcript_full.jsonl')
});

rl.on('line', (line) => {
  if (line.includes('"step_index":722') || line.includes('"step_index":723')) {
    const p = JSON.parse(line);
    console.log(p.step_index, p.content);
  }
});
