// Load and parse data
// const left = [3, 4, 2, 1, 3, 3];
// const right = [4, 3, 5, 3, 9, 3];

const rawData = await Deno.readTextFile("./day_1.txt");

const [left, right] = rawData
  .split("\n")
  .map((row) => row.split(",").map((e) => +e));

// Part 1
const leftSorted = left.sort();
const rightSorted = right.sort();

let totalDifference = 0;
for (let i = 0; i < left.length; i++) {
  totalDifference += Math.abs(leftSorted[i] - rightSorted[i]);
}

console.log({ totalDifference });

// Part 2
const rightCount: Record<number, number> = {};
for (const e of right) {
  rightCount[e] ??= 0;
  rightCount[e]++;
}

let totalMultipliedSimilarity = 0;
for (const e of left) {
  totalMultipliedSimilarity += e * (rightCount[e] ?? 0);
}

console.log({ totalMultipliedSimilarity });
