const fs = require("fs");
const { runSingleBenchmark, calculateSpread } = require("./benchmark_runner");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("=== STARTING SCRIPPTED SCROLL BENCHMARK SUITE ===");
  const allResults = {};

  // 1. Trace Run at DPR 2 Fast Scroll
  console.log("\n[1/6] Running Trace Run (DPR 2, Fast 2.5s) to analyze ImageDecode & StyleLayout...");
  const traceRun = await runSingleBenchmark({
    cpuThrottle: 1,
    dpr: 2,
    scrollSpeed: "fast",
    collectTrace: true,
  });
  console.log("Trace result:", {
    fps: traceRun.fps.toFixed(1),
    maxDelta: traceRun.maxDelta.toFixed(1),
    reactRendersDuringScroll: traceRun.reactRendersDuringScroll,
    scrubImageRequests: traceRun.scrubImageRequestsCount,
    scrubRscRequests: traceRun.scrubRscRequestsCount,
    traceMetrics: traceRun.traceMetrics,
  });
  allResults.traceRun = traceRun;

  // 2. 10 runs of DPR 2 Normal Scroll (7s)
  console.log("\n[2/6] Running 10 runs at DPR 2, 1x CPU, Normal (7s)...");
  const dpr2NormRuns = [];
  for (let i = 1; i <= 10; i++) {
    process.stdout.write(` Run ${i}/10... `);
    const r = await runSingleBenchmark({ cpuThrottle: 1, dpr: 2, scrollSpeed: "normal" });
    dpr2NormRuns.push(r);
    console.log(`FPS: ${r.fps.toFixed(1)}, maxDelta: ${r.maxDelta.toFixed(1)}ms, >20ms: ${r.countGt20}, renders: ${r.reactRendersDuringScroll}`);
    await sleep(500);
  }
  allResults.dpr2_norm_10runs = {
    runs: dpr2NormRuns,
    spread: calculateSpread(dpr2NormRuns),
  };

  // 3. 10 runs of DPR 2 Fast Scroll (2.5s)
  console.log("\n[3/6] Running 10 runs at DPR 2, 1x CPU, Fast (2.5s)...");
  const dpr2FastRuns = [];
  for (let i = 1; i <= 10; i++) {
    process.stdout.write(` Run ${i}/10... `);
    const r = await runSingleBenchmark({ cpuThrottle: 1, dpr: 2, scrollSpeed: "fast" });
    dpr2FastRuns.push(r);
    console.log(`FPS: ${r.fps.toFixed(1)}, maxDelta: ${r.maxDelta.toFixed(1)}ms, >20ms: ${r.countGt20}, renders: ${r.reactRendersDuringScroll}`);
    await sleep(500);
  }
  allResults.dpr2_fast_10runs = {
    runs: dpr2FastRuns,
    spread: calculateSpread(dpr2FastRuns),
  };

  // 4. 5 runs at DPR 2, 4x CPU throttle Normal (7s)
  console.log("\n[4/6] Running 5 runs at DPR 2, 4x CPU Throttle, Normal (7s)...");
  const cpu4xRuns = [];
  for (let i = 1; i <= 5; i++) {
    process.stdout.write(` Run ${i}/5... `);
    const r = await runSingleBenchmark({ cpuThrottle: 4, dpr: 2, scrollSpeed: "normal" });
    cpu4xRuns.push(r);
    console.log(`FPS: ${r.fps.toFixed(1)}, maxDelta: ${r.maxDelta.toFixed(1)}ms, >20ms: ${r.countGt20}, longTasks: ${r.longTasks.length}`);
    await sleep(500);
  }
  allResults.dpr2_4xcpu_5runs = {
    runs: cpu4xRuns,
    spread: calculateSpread(cpu4xRuns),
  };

  // 5. 5 runs of Empty Pin Floor at DPR 2, 4x CPU throttle Normal (7s)
  console.log("\n[5/6] Running 5 runs of Empty Pin Floor (4x CPU, DPR 2, Normal)...");
  const floorRuns = [];
  for (let i = 1; i <= 5; i++) {
    process.stdout.write(` Floor Run ${i}/5... `);
    const r = await runSingleBenchmark({ cpuThrottle: 4, dpr: 2, scrollSpeed: "normal", emptyPin: true });
    floorRuns.push(r);
    console.log(`FPS: ${r.fps.toFixed(1)}, maxDelta: ${r.maxDelta.toFixed(1)}ms, >20ms: ${r.countGt20}, longTasks: ${r.longTasks.length}`);
    await sleep(500);
  }
  allResults.empty_pin_floor_4x = {
    runs: floorRuns,
    spread: calculateSpread(floorRuns),
  };

  fs.writeFileSync("scratch/new_implementation_benchmarks.json", JSON.stringify(allResults, null, 2));
  console.log("\n=== ALL BENCHMARKS COMPLETED. SAVED TO scratch/new_implementation_benchmarks.json ===");
}

main().catch(console.error);
