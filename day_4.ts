// const rows = [
//   "MMMSXXMASM",
//   "MSAMXMSMSA",
//   "AMXSXMAAMM",
//   "MSAMASMSMX",
//   "XMASAMXAMM",
//   "XXAMMXXAMA",
//   "SMSMSASXSS",
//   "SAXAMASAAA",
//   "MAMMMXMMMM",
//   "MXMXAXMASX",
// ];
import rows from "./day_4.json" with { type: "json" };
const height = rows.length;
const width = rows[0].length;

// Part 1
// Preprocess diagonal rows
const rows1 = rows.map((row, i) =>
  " ".repeat(i) + row + " ".repeat(height - i - 1)
);
const rows2 = rows.reverse().map((row, i) =>
  " ".repeat(i) + row + " ".repeat(height - i - 1)
);

let fullText = rows.join("\n");
// Cols
for (const rowsSet of [rows, rows1, rows2]) {
  for (let x = 0; x < rowsSet[0].length; x++) {
    let col = "";
    for (let y = 0; y < height; y++) {
      col += rowsSet[y][x];
    }
    fullText += col + "\n";
  }
}

const matches = [...fullText.matchAll(/(?=XMAS|SAMX)/g)];
const count = matches.length;

console.log({ count });

// Part 2
let full3x3Text = "";
for (let y = 0; y < height - 2; y++) {
  for (let x = 0; x < width - 2; x++) {
    // let square3x3 = "";
    // for (let j = y; j < y + 3; j++) {
    //   for (let i = x; i < x + 3; i++) {
    //     square3x3 += rows[j][i];
    //   }
    // }
    const square3x3 = `${rows[y][x]}.${rows[y][x + 2]}` +
      `.${rows[y + 1][x + 1]}.` +
      `${rows[y + 2][x]}.${rows[y + 2][x + 2]}`;
    full3x3Text += square3x3 + "\n";
  }
}

console.log(full3x3Text);

const squareMatches = [
  ...full3x3Text.matchAll(/^M.S.A.M.S$/gm),
  ...full3x3Text.matchAll(/^M.M.A.S.S$/gm),
  ...full3x3Text.matchAll(/^S.M.A.S.M$/gm),
  ...full3x3Text.matchAll(/^S.S.A.M.M$/gm),
];
const squareCount = squareMatches.length;
console.log({ squareCount });
