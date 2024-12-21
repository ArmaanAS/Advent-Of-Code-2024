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

const map: (string | null)[][] = text.split("\n").map((row) => row.split(""));

const width = map[0].length;
const height = map.length;

const sIndex = text.indexOf("S");
const eIndex = text.indexOf("E");

const sx = sIndex % (width + 1);
const sy = sIndex / (width + 1) | 0;
const ex = eIndex % (width + 1);
const ey = eIndex / (width + 1) | 0;

console.log({ sx, sy, ex, ey });

const distances = new Array(width * height).fill(Infinity);
const visited = new Array(width * height).fill(false);

let cheat1x = -1;
let cheat1y = -1;
let cheat2x = -1;
let cheat2y = -1;
function getDist(x: number, y: number, useCache = true): number {
  const isWall = !map[y]?.[x] || map[y][x] === "#";
  const isCheatWall = (x === cheat1x && y === cheat1y) ||
    (x === cheat2x && y === cheat2y);
  if (isWall && !isCheatWall) return Infinity;

  if (isCheatWall) useCache = false;

  const index = y * width + x;
  if (x === ex && y === ey) {
    distances[index] = 0;
    return 0;
  }
  if (visited[index]) return distances[index];

  visited[index] = true;

  let minDist = Infinity;
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    minDist = Math.min(minDist, getDist(x + dx, y + dy, useCache) + 1);
  }

  if (distances[index] === Infinity) distances[index] = minDist;
  return minDist;
}

const baseDist = getDist(sx, sy);
console.log({ baseDist });

const cheatDistances = new Map<string, number>();

for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    if (map[y][x] !== "#") continue;

    cheat1x = x;
    cheat1y = y;

    let minDist = Infinity;
    for (const [a, b] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
      if (map[b]?.[a] !== ".") continue;

      cheat2x = a;
      cheat2y = b;
      // const key = `${cheat1x},${cheat1y} ${cheat2x},${cheat2y}`;
      visited.fill(false);
      // cheatDistances.set(key, getDist(sx, sy));
      minDist = Math.min(minDist, getDist(sx, sy));
    }

    if (minDist !== Infinity) {
      const key = `${cheat1x},${cheat1y}`;
      cheatDistances.set(key, minDist);
    }
  }
}
// console.log(cheatDistances);

const reductionCounts: Record<number, number> = {};
let reduction100Count = 0;
for (const cheatDist of cheatDistances.values()) {
  const reduction = baseDist - cheatDist;
  reductionCounts[reduction] ??= 0;
  reductionCounts[reduction] += 1;
  if (reduction >= 100) reduction100Count += 1;
}

console.log(reductionCounts);
console.log({ reduction100Count });
