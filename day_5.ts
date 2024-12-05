// const rules = [
//   [47, 53],
//   [97, 13],
//   [97, 61],
//   [97, 47],
//   [75, 29],
//   [61, 13],
//   [75, 53],
//   [29, 13],
//   [97, 29],
//   [53, 29],
//   [61, 53],
//   [97, 53],
//   [61, 29],
//   [47, 13],
//   [75, 47],
//   [97, 75],
//   [47, 61],
//   [75, 61],
//   [47, 29],
//   [75, 13],
//   [53, 13],
// ];

// const updates = [
//   [75, 47, 61, 53, 29],
//   [97, 61, 53, 29, 13],
//   [75, 29, 13],
//   [75, 97, 47, 61, 53],
//   [61, 13, 29],
//   [97, 13, 75, 29, 47],
// ];
import data from "./day_5.json" with { type: "json" };
const { rules, updates } = data;

// Part 1
const before: Record<number, number[]> = {};
for (const [a, b] of rules) {
  before[b] ??= [];
  before[b].push(a);
}

let totalOfMiddlePages = 0;
const incorrectUpdates = [];
updates: for (const update of updates) {
  for (let i = 0; i < update.length - 1; i++) {
    const a = update[i];
    for (let j = i + 1; j < update.length; j++) {
      const b = update[j];

      if (before[a]?.includes(b)) {
        // console.log(`${a} should be before ${b}`);
        incorrectUpdates.push(update);
        continue updates;
      }
    }
  }
  const middle = update[update.length / 2 | 0];
  totalOfMiddlePages += middle;
  // console.log({ update, middle });
}

// console.log(correctUpdates);
console.log({ totalOfMiddlePages });

// Part 2
let totalOfFixedMiddlePages = 0;
updates: for (const update of incorrectUpdates) {
  const correct = [...update].sort((a, b) =>
    before[a]?.includes(b) ? 1 : before[b]?.includes(a) ? -1 : 0
  );

  for (let i = 0; i < correct.length - 1; i++) {
    const a = correct[i];
    for (let j = i + 1; j < correct.length; j++) {
      const b = correct[j];

      if (before[a]?.includes(b)) {
        console.log(`${a} should be before ${b}`);
        continue updates;
      }
    }
  }
  const middle = correct[correct.length / 2 | 0];
  totalOfFixedMiddlePages += middle;
}

console.log({ totalOfFixedMiddlePages });
