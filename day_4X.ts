const rows = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];
const height = rows.length;
const width = rows[0].length;

// Part 1
const cols = [];
const diags1 = [];
const diags2 = [];
for (let x = 0; x < width; x++) {
  let col = "";
  for (let y = 0; y < height; y++) {
    col += rows[y][x];
  }
  cols.push(col);

  let diag1 = "";
  for (let d1x = x, y = 0; d1x < width && y < height; d1x++, y++) {
    diag1 += rows[y][d1x];
  }
  if (diag1.length >= 4) diags1.push(diag1);

  let diag2 = "";
  for (let d2x = x, y = 0; d2x >= 0 && y < height; d2x--, y++) {
    diag2 += rows[y][d2x];
  }
  if (diag2.length >= 4) diags2.push(diag2);
}

console.log(cols.join("\n"));
console.log();
console.log(diags1.join("\n"));
console.log();
console.log(diags2.join("\n"));

const text = [
  ...rows,
  ...cols,
  ...diags1,
  ...diags2,
].join("\n");
const matches = [...text.matchAll(/XMAS/g), ...text.matchAll(/SAMX/g)].flat();

const count = matches.length;
console.log({ count });

console.log(
  [
    ...rows,
    ...cols,
    ...diags1,
    ...diags2,
  ]
    .join("\n"),
);
