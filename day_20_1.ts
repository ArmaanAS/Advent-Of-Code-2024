// const text = `\
// ###############
// #...#...#.....#
// #.#.#.#.#.###.#
// #S#...#.#.#...#
// #######.#.#.###
// #######.#.#...#
// #######.#.###.#
// ###..E#...#...#
// ###.#######.###
// #...###...#...#
// #.#####.#.###.#
// #.#...#.#.#...#
// #.#.#.#.#.#.###
// #...#...#...###
// ###############`;
const text = await Deno.readTextFile("./day_20.txt");

const map: (string | null)[][] = text.split("\n").map((row) =>
  row.replace(/[ES]/g, ".").split("")
);

const width = map[0].length;
const height = map.length;

const sIndex = text.indexOf("S");
const eIndex = text.indexOf("E");

const sx = sIndex % (width + 1);
const sy = sIndex / (width + 1) | 0;
const ex = eIndex % (width + 1);
const ey = eIndex / (width + 1) | 0;

console.log({ sx, sy, ex, ey });

const distances = map.map((row) => row.map(() => Infinity));

let dist = 0;
for (let x = ex, y = ey; !(x === sx && y === sy); dist++) {
  if (distances[y][x] !== Infinity) break;
  distances[y][x] = dist;

  let newX = x;
  let newY = y;
  for (const [a, b] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
    if (map[b][a] === "." && distances[b][a] === Infinity) {
      newX = a;
      newY = b;
    } else if (map[b][a] === "#") {
      const isNotDeadEnd =
        (map[b - 1]?.[a] === "." && !(b - 1 === y && a === x)) ||
        (map[b + 1]?.[a] === "." && !(b + 1 === y && a === x)) ||
        (map[b][a - 1] === "." && !(b === y && a - 1 === x)) ||
        (map[b][a + 1] === "." && !(b === y && a + 1 === x));
      if (isNotDeadEnd) {
        distances[b][a] = Math.min(distances[b][a], dist + 1);
      }
    }
  }
  x = newX;
  y = newY;
}
distances[sy][sx] = dist;

const baseDist = dist;
console.log(distances);
console.log({ baseDist });

// Part 1
const reductionDistances: Record<number, number> = {};
let reducedBy100 = 0;
const visited = map.map((row) => row.map(() => false));
dist = 1;
for (let x = sx, y = sy; !visited[y][x]; dist++) {
  visited[y][x] = true;
  for (const [a, b] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
    if (map[b][a] === "#" && distances[b][a] !== Infinity) {
      const cheatDist = dist + distances[b][a];
      const reductionDist = baseDist - cheatDist;
      reductionDistances[reductionDist] ??= 0;
      reductionDistances[reductionDist] += 1;
      if (reductionDist >= 100) reducedBy100 += 1;
    } else if (map[b][a] === "." && !visited[b][a]) {
      x = a;
      y = b;
    }
  }
  console.log(x, y);
}

console.log(reductionDistances);
console.log({ reducedBy100 });
