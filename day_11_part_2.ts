const nums = [125, 17];
// const nums = [2, 72, 8949, 0, 981038, 86311, 246, 7636740];

// const depthSplitCache = [...new Array(75)].map(() =>
//   new Map<number, number[]>()
// );

// function splitNum(num: number, depth: number): number[] {
//   if (depth === 0) return [num];
//   const depthCache = depthSplitCache[depth];
//   const cachedVal = depthCache.get(num);
//   if (cachedVal) return cachedVal;

//   let split: number[];
//   split: {
//     if (num === 0) {
//       split = splitNum(1, depth - 1);
//       break split;
//     }
//     const str = `${num}`;
//     if (str.length % 2 === 0) {
//       const midPoint = str.length / 2;
//       const left = +str.slice(0, midPoint);
//       const right = +str.slice(midPoint);
//       const leftVal = splitNum(left, depth - 1);
//       const rightVal = splitNum(right, depth - 1);
//       split = [...leftVal, ...rightVal];
//     } else {
//       split = splitNum(num * 2024, depth - 1);
//     }
//   }
//   depthCache.set(num, split);
//   return split;
// }

const depthSplitCache = new Map<number, number[][]>();

function splitNum(num: number, depth: number, cacheKeys: number[]): number[] {
  if (depth === 0) return [num];

  let cache = depthSplitCache.get(num);
  if (!cache) {
    cache = [];
    depthSplitCache.set(num, cache);
  } else if (cache[depth]) {
    return cache[depth];
  }

  cacheKeys = [...cacheKeys, num];

  let split: number[];
  split: {
    if (num === 0) {
      split = splitNum(1, depth - 1, cacheKeys);
      break split;
    }
    const str = `${num}`;
    if (str.length % 2 === 0) {
      const midPoint = str.length / 2;
      const left = +str.slice(0, midPoint);
      const right = +str.slice(midPoint);
      const leftSplit = splitNum(left, depth - 1, cacheKeys);
      const rightVal = splitNum(right, depth - 1, cacheKeys);
      // split = [...leftSplit, ...rightVal];
      split = leftSplit.concat(rightVal);
    } else {
      split = splitNum(num * 2024, depth - 1, cacheKeys);
    }
  }
  cache[depth] = split;
  for (let i = 0; i < cacheKeys.length - 1; i++) {
    depthSplitCache.get(cacheKeys[i])![cacheKeys.length - i] = split;
  }
  return split;
}

const start = performance.now();
let total = 0;
for (const num of nums) {
  total += splitNum(num, 6, []).length;
}
console.log(performance.now() - start);
console.log(total);

//  1: 3
//  2: 4
//  3: 5
//  4: 9
//  5: 13
//  6: 22
//  7: 31
//  8: 42
//  9: 68
// 10: 109
// 11: 170
// 12: 235
// 13: 342
// 14: 557
// 15: 853
// 16: 1298
// 17: 1951
// 18: 2869
// 19: 4490
// 20: 6837
// 21: 10362
// 22: 15754
// 23: 23435
// 24: 36359
// 25: 55312
// 26: 83230
// 27: 127262
// 28: 191468
// 29: 292947

Deno.bench("[...]", () => {
  const left = [...new Array(1000)];
  const right = [...new Array(1000)];
  const arr = [...left, ...right];
});

Deno.bench("concat", () => {
  const left = new Array(1000).fill(234);
  const right = new Array(1000).fill(234);
  const arr = left.concat(right);
});

Deno.bench("push", () => {
  const left = new Array(1000).fill(234);
  const right = new Array(1000).fill(234);
  const arr = left.push(...right);
});
