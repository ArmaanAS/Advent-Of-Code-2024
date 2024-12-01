const rawData = await Deno.readTextFile("./day_1.txt");

const [left, right] = rawData
  .split("\n")
  .map((row) => row.split(",").map((e) => +e).sort());

let totalDifference = 0;
for (let i = 0; i < left.length; i++) {
  totalDifference += Math.abs(left[i] - right[i]);
}

console.log({ totalDifference });
