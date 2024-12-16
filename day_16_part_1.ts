// const text = `\
// ###############
// #.......#....E#
// #.#.###.#.###.#
// #.....#.#...#.#
// #.###.#####.#.#
// #.#.#.......#.#
// #.#.#####.###.#
// #...........#.#
// ###.#.#####.#.#
// #...#.....#.#.#
// #.#.#.###.#.#.#
// #.....#...#.#.#
// #.###.#.#.#.#.#
// #S..#.....#...#
// ###############`;
// const text = `\
// #################
// #...#...#...#..E#
// #.#.#.#.#.#.#.#.#
// #.#.#.#...#...#.#
// #.#.#.#.###.#.#.#
// #...#.#.#.....#.#
// #.#.#.#.#.#####.#
// #.#...#.#.#.....#
// #.#.#####.#.###.#
// #.#.#.......#...#
// #.#.###.#####.###
// #.#.#...#.....#.#
// #.#.#.#####.###.#
// #.#.#.........#.#
// #.#.#.#########.#
// #S#.............#
// #################`;
const text = await Deno.readTextFile("./day_16.txt");

const map = text.split("\n").map((row) => row.split(""));

const width = map[0].length;
const height = map.length;

const sIndex = text.indexOf("S");
const eIndex = text.indexOf("E");

const sx = sIndex % (width + 1);
const sy = Math.floor(sIndex / (width + 1));
const ex = eIndex % (width + 1);
const ey = Math.floor(eIndex / (width + 1));

console.log({ sx, sy, ex, ey });

// Part 1
const mapScores = map.map((row) =>
  row.map(() => ({ fromStart: Infinity, toEnd: Infinity }))
);

interface XY {
  x: number;
  y: number;
}

let bestScore = Infinity;
function dfs(
  { x, y }: XY,
  { x: px, y: py }: XY,
  score: number,
) {
  const mapScore = mapScores[y][x];
  if (score > bestScore) return Infinity;
  if (score > mapScore.fromStart) return Infinity;
  mapScore.fromStart = score;
  // if (score > mapScore.fromStart) return score + mapScore.toEnd;
  // if (score < mapScore.fromStart) mapScore.fromStart = score;
  if (x === ex && y === ey) {
    // console.log(map.map((row) => row.join("")).join("\n"));
    // console.log("Score:", score);
    mapScore.fromStart = Math.min(mapScore.fromStart, score);
    mapScore.toEnd = 0;
    return score;
  }

  const moves = [
    { x: x - 1, y, score: x - px === -1 ? 0 : 1000, dir: "<" },
    { x: x + 1, y, score: x - px === 1 ? 0 : 1000, dir: ">" },
    { x, y: y - 1, score: y - py === -1 ? 0 : 1000, dir: "^" },
    { x, y: y + 1, score: y - py === 1 ? 0 : 1000, dir: "v" },
  ]
    .filter(({ x, y }) =>
      // !(x === px && y === py) && [".", "E"].includes(map[y][x])
      !(x === px && y === py) && (map[y][x] === "." || map[y][x] === "E")
    )
    .sort((a, b) => a.score - b.score);

  if (moves.length === 0) return Infinity;

  // console.log(
  //   ...moves.map(({ score: s, ...p }) => ({ ...p, score: score + s + 1 })),
  // );

  let localBestScore = Infinity;
  for (const { score: s, dir, ...pos } of moves) {
    map[y][x] = dir;
    const newScore = dfs(pos, { x, y }, score + s + 1);
    const toEnd = newScore - score;

    if ((score + toEnd) < (mapScore.fromStart + mapScore.toEnd)) {
      mapScore.fromStart = score;
      mapScore.toEnd = toEnd;
    }
    // mapScore.toEnd = Math.min(mapScore.toEnd, toEnd);
    bestScore = Math.min(bestScore, newScore);
    localBestScore = Math.min(localBestScore, newScore);
  }
  map[y][x] = ".";

  return localBestScore;
}

console.log(dfs({ x: sx, y: sy }, { x: sx - 1, y: sy }, 0));

// Part 2
let bestTiles = 0;
for (let y = 0; y < height; y++) {
  let row = "";
  for (let x = 0; x < height; x++) {
    const mapScore = mapScores[y][x];
    const score = mapScore.fromStart + mapScore.toEnd;
    if (score === bestScore) {
      row += "O";
      bestTiles += 1;
    } else {
      row += map[y][x];
    }
    if (score < bestScore) {
      console.log(
        `(${x}, ${y}) ${score} (${mapScore.fromStart} + ${mapScore.toEnd})`,
      );
    }
  }
  console.log(row);
}

console.log({ bestTiles });
