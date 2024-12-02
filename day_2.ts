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
    const difference = row[i] - row[i + 1];
    const absDiff = Math.abs(difference);
    const sign = Math.sign(difference);
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

  if (!isRowUnsafe(row.slice(1))) {
    dampenedSafe++;
    continue;
  }
  const row2 = [...row];
  const row3 = [...row];
  const indexToRemove = isUnsafe[1];
  row2.splice(indexToRemove, 1);
  row3.splice(indexToRemove + 1, 1);
  if (!isRowUnsafe(row2)) {
    dampenedSafe++;
  } else if (!isRowUnsafe(row3)) {
    dampenedSafe++;
  }
}

console.log({ safe, dampenedSafe });
