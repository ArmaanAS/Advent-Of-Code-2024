// Load and parse data
// const data = [
//   [7, 6, 4, 2, 1],
//   [1, 2, 7, 8, 9],
//   [9, 7, 6, 2, 1],
//   [1, 3, 2, 4, 5],
//   [8, 6, 4, 4, 1],
//   [1, 3, 6, 7, 9],
// ];

import data from "./day_2.json" with { type: "json" };

function isRowUnsafe(row: number[]): [true, number] | false {
  let rowSign = 0;

  for (let i = 0; i < row.length - 1; i++) {
    const diff = row[i] - row[i + 1];
    const absDiff = Math.abs(diff);
    const sign = Math.sign(diff);
    if ((rowSign !== 0 && sign !== rowSign) || (absDiff < 1 || absDiff > 3)) {
      return [true, i];
    }
    rowSign = sign;
  }
  return false;
}

let safe = 0;
let dampenedSafe = 0;
for (const row of data) {
  const isUnsafe = isRowUnsafe(row);
  if (!isUnsafe) {
    safe++;
    dampenedSafe++;
    continue;
  }

  const failedIndex = isUnsafe[1];
  // Try removing first element which decides ascending / descending
  if (failedIndex === 1 && !isRowUnsafe(row.slice(1))) {
    dampenedSafe++;
    continue;
  }
  // Try removing failed index and element after failed index
  const row2 = [...row];
  const row3 = [...row];
  row2.splice(failedIndex, 1);
  row3.splice(failedIndex + 1, 1);
  if (!isRowUnsafe(row2)) {
    dampenedSafe++;
  } else if (!isRowUnsafe(row3)) {
    dampenedSafe++;
  }
}

console.log({ safe, dampenedSafe });
