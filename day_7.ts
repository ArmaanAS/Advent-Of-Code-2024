// const text = `\
// 190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`;
const text = await Deno.readTextFile("./day_7.txt");

const data = text
  .split("\n")
  .map((row) => row.split(/[^\d]/g).map(Number));

// Part 1
let totalCorrect = 0;
for (const [total, ...nums] of data) {
  let currentPossibleValues = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    currentPossibleValues = currentPossibleValues
      .flatMap((n) => [num + n, num * n])
      .filter((n) => n <= total);
  }
  // console.log(currentPossibleValues);
  if (currentPossibleValues.includes(total)) totalCorrect += total;
}

console.log({ totalCorrect });

// Part 2
let totalCorrectWithConcat = 0;
for (const [total, ...nums] of data) {
  let currentPossibleValues = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    currentPossibleValues = currentPossibleValues
      .flatMap((n) => [num + n, num * n, +`${n}${num}`])
      .filter((n) => n <= total);
  }
  // console.log(currentPossibleValues);
  if (currentPossibleValues.includes(total)) totalCorrectWithConcat += total;
}

console.log({ totalCorrectWithConcat });
