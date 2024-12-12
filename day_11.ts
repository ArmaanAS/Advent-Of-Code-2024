// const text = "125 17";
const text = await Deno.readTextFile("./day_11.txt");

// Part 1
let nums = text.split(" ").map(Number);
for (let i = 0; i < 25; i++) {
  const newNums = [];
  for (const num of nums) {
    if (num === 0) {
      newNums.push(1);
      continue;
    }
    const str = `${num}`;
    if (str.length % 2 === 0) {
      const midPoint = str.length / 2;
      const left = +str.slice(0, midPoint);
      const right = +str.slice(midPoint);
      newNums.push(left, right);
    } else {
      newNums.push(num * 2024);
    }
  }
  nums = newNums;
  // console.log(nums);
}

console.log(nums.length);

// Part 2
nums = text.split(" ").map(Number);

const cache = new Map<number, number[]>();
const cacheDepth = 5;
// let cacheDepth = 4;

function splitStonesIterative(num: number, depth = 25): number[] {
  if (depth === cacheDepth && cache.has(num)) return cache.get(num)!;

  let nums = [num];
  for (let i = 0; i < depth; i++) {
    const newNums = [];
    for (const num of nums) {
      if (num === 0) {
        newNums.push(1);
        continue;
      }
      const str = `${num}`;
      if (str.length % 2 === 0) {
        const midPoint = str.length / 2;
        const left = +str.slice(0, midPoint);
        const right = +str.slice(midPoint);
        newNums.push(left, right);
      } else {
        newNums.push(num * 2024);
      }
    }
    nums = newNums;
  }
  if (depth === cacheDepth) cache.set(num, nums);
  return nums;
}

function recursiveIter(num: number, depth: number) {
  const nums = splitStonesIterative(num, Math.min(cacheDepth, depth));
  if (depth <= cacheDepth) return nums.length;

  let total = 0;
  for (const n of nums) {
    total += recursiveIter(n, depth - cacheDepth);
  }
  return total;
}

// for (let i = 1; i < 30; i++) {
const start = performance.now();
let totalStones = 0;
for (const num of nums) {
  // totalStones += splitStonesIterative(num, 25).length;
  // totalStones += recursiveIter(num, i);
  totalStones += recursiveIter(num, 50);
}
console.log(performance.now() - start);
// console.log(i, totalStones);
console.log(totalStones);
// }

// for (; cacheDepth < 25; cacheDepth++) {
//   cache.clear();
//   let correct = 0;
//   Deno.bench(`cacheDepth: ${cacheDepth}`, () => {
//     let totalStones = 0;
//     for (const num of nums) {
//       // totalStones += splitStonesIterative(num, 25).length;
//       totalStones += recursiveIter(num, 25);
//     }
//     if (totalStones !== 55312) throw new Error("" + totalStones);
//     correct++;
//   });
// }
