const rawData = await Deno.readTextFile("./day_3.txt");

// Part 1
const mulMatches = rawData.matchAll(/(?<=mul\()\d{1,3},\d{1,3}(?=\))/g);

let totalMultiplied = 0;
for (const [match] of mulMatches) {
  const [a, b] = match.split(",").map(Number);
  totalMultiplied += a * b;
}

console.log({ totalMultiplied });

// Part 2
const doDontMulMatches = rawData.matchAll(
  /(?<=mul\()\d{1,3},\d{1,3}(?=\))|do(n't)?(?=\(\))/g,
);

let totalConditionalMultiplied = 0;
let enabled = true;
for (const [match] of doDontMulMatches) {
  if (match === "do") {
    enabled = true;
  } else if (match === "don't") {
    enabled = false;
  } else if (enabled) {
    const [a, b] = match.split(",").map(Number);
    totalConditionalMultiplied += a * b;
  }
}

console.log({ totalConditionalMultiplied });
