// const text = `\
// RRRRIICCFF
// RRRRIICCCF
// VVRRRCCFFF
// VVRCCCJFFF
// VVVVCJJCFE
// VVIVCCJJEE
// VVIIICJJEE
// MIIIIIJJEE
// MIIISIJEEE
// MMMISSJEEE`;
const text = await Deno.readTextFile("./day_12.txt");

const map = text.split("\n").map((row) => row.split(""));

const width = map[0].length;
const height = map.length;

const groupedMap = map.map((row) => row.map(() => 0));

let groupCounter = 1;
function traverseGroup(x: number, y: number, type: string, group: number) {
  if (map[y]?.[x] !== type || groupedMap[y][x]) return;

  groupedMap[y][x] = group;

  traverseGroup(x + 1, y, type, group);
  traverseGroup(x - 1, y, type, group);
  traverseGroup(x, y + 1, type, group);
  traverseGroup(x, y - 1, type, group);
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (!groupedMap[y][x]) {
      traverseGroup(x, y, map[y][x], groupCounter++);
    }
  }
}

console.log(
  groupedMap.map((row) => row.map((i) => i.toString(16)).join("")).join("\n"),
);

// Part 1
const groupArea: Record<string, number> = {};
const groupPerimeter: Record<string, number> = {};
const groupSides: Record<string, number> = {};
const groupSidesVisited: Record<string, Set<string>> = {};

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const group = groupedMap[y][x];

    groupArea[group] ??= 0;
    groupArea[group] += 1;

    groupPerimeter[group] ??= 0;
    groupSides[group] ??= 0;
    groupSidesVisited[group] ??= new Set();
    if (groupedMap[y - 1]?.[x] !== group) {
      groupPerimeter[group] += 1;
      if (!groupSidesVisited[group].has(`T${x},${y - 1}`)) {
        groupSides[group] += 1;
        for (
          let i = x;
          i < width && groupedMap[y][i] === group &&
          groupedMap[y - 1]?.[i] !== group;
          i++
        ) {
          groupSidesVisited[group].add(`T${i},${y - 1}`);
        }
      }
    }
    if (groupedMap[y + 1]?.[x] !== group) {
      groupPerimeter[group] += 1;
      if (!groupSidesVisited[group].has(`B${x},${y + 1}`)) {
        groupSides[group] += 1;
        for (
          let i = x;
          i < width && groupedMap[y][i] === group &&
          groupedMap[y + 1]?.[i] !== group;
          i++
        ) {
          groupSidesVisited[group].add(`B${i},${y + 1}`);
        }
      }
    }
    if (groupedMap[y]?.[x - 1] !== group) {
      groupPerimeter[group] += 1;
      if (!groupSidesVisited[group].has(`L${x - 1},${y}`)) {
        groupSides[group] += 1;
        for (
          let j = y;
          j < height && groupedMap[j][x] === group &&
          groupedMap[j]?.[x - 1] !== group;
          j++
        ) {
          groupSidesVisited[group].add(`L${x - 1},${j}`);
        }
      }
    }
    if (groupedMap[y]?.[x + 1] !== group) {
      groupPerimeter[group] += 1;
      if (!groupSidesVisited[group].has(`R${x + 1},${y}`)) {
        groupSides[group] += 1;
        for (
          let j = y;
          j < height && groupedMap[j][x] === group &&
          groupedMap[j]?.[x + 1] !== group;
          j++
        ) {
          groupSidesVisited[group].add(`R${x + 1},${j}`);
        }
      }
    }
  }
}

let totalPrice = 0;
for (const group in groupArea) {
  totalPrice += groupArea[group] * groupPerimeter[group];
}

console.log({ totalPrice });

// Part 2
let totalBulkPrice = 0;
for (const group in groupArea) {
  totalBulkPrice += groupArea[group] * groupSides[group];
}

console.log({ totalBulkPrice });
