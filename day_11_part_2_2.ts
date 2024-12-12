const numCache = new Map<number, Map<number, number>>();

function splitStones(num: number, depth = 25): number {
  if (depth === 0) return 1;

  let cache: Map<number, number>;
  if (numCache.has(num)) {
    cache = numCache.get(num)!;
  } else {
    cache = new Map();
    numCache.set(num, cache);
  }
  if (cache.has(depth)) return cache.get(depth)!;

  let total;
  if (num === 0) {
    total = splitStones(1, depth - 1);
  } else {
    const str = `${num}`;
    if (str.length % 2 === 0) {
      const midPoint = str.length / 2;
      const left = +str.slice(0, midPoint);
      const right = +str.slice(midPoint);
      total = splitStones(left, depth - 1) + splitStones(right, depth - 1);
    } else {
      total = splitStones(num * 2024, depth - 1);
    }
  }
  cache.set(depth, total);
  return total;
}

// const nums = [125, 17];
const text = await Deno.readTextFile("./day_11.txt");
const nums = text.split(" ").map(Number);

const start = performance.now();
let total = 0;
for (const num of nums) {
  total += splitStones(num, 75);
}
console.log({ total });
console.log(`${performance.now() - start}ms`);
