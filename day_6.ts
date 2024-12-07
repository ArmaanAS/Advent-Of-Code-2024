// let text = `\
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;
let text = await Deno.readTextFile("./day_6.txt");
const map = text.split("\n").map((row) =>
  row.split("").map((c) =>
    c === "#" ? null : {} as Record<string, true | undefined>
  )
);
const emptyMap = structuredClone(map);

const width = map[0].length;
const height = map.length;

const guardIndex = text.indexOf("^");
const initialGuardX = guardIndex % (width + 1);
const initialGuardY = guardIndex / (width + 1) | 0;
const initialGuardDir: [number, number] = [0, -1];

function turn([dx, dy]: [number, number]): [number, number] {
  if (dx === 0 && dy === -1) return [1, 0];
  if (dx === 1 && dy === 0) return [0, 1];
  if (dx === 0 && dy === 1) return [-1, 0];
  if (dx === -1 && dy === 0) return [0, -1];
  throw new Error("Invalid input direction");
}

let guardX = initialGuardX;
let guardY = initialGuardY;
let guardDir = initialGuardDir;

// Part 1
let currentPositionVisitedState = map[guardY][guardX]!;
// const overlaps = new Set();
outer: while (true) {
  if (currentPositionVisitedState[`${guardDir}`]) break;
  currentPositionVisitedState[`${guardDir}`] = true;

  // if (currentPositionVisitedState[`${turn(guardDir)}`]) {
  //   overlaps.add(`${guardX},${guardY}`);
  // }

  // for (let i = 0; i < 3; i++) {
  const nextPos = map[guardY + guardDir[1]]?.[guardX + guardDir[0]];
  if (nextPos === undefined) break outer;
  if (nextPos === null) {
    // console.log("Turn");
    guardDir = turn(guardDir);
    continue;
  }
  if (nextPos) {
    // console.log("Forward");
    guardX = guardX + guardDir[0];
    guardY = guardY + guardDir[1];
    currentPositionVisitedState = nextPos;
    continue outer;
  }
  // }
}

let totalVisited = 0;
for (const row of map) {
  for (const pos of row) {
    if (!pos) continue;
    if (Object.keys(pos).length !== 0) totalVisited += 1;
  }
}

console.log({ totalVisited });
// console.log({ overlaps: overlaps.size });

// Part 2
function guardGetsStuckInLoop(map: typeof emptyMap): boolean {
  let guardX = initialGuardX;
  let guardY = initialGuardY;
  let guardDir = initialGuardDir;

  // Part 1
  let currentPositionVisitedState = map[guardY][guardX]!;
  if (!currentPositionVisitedState) return false;
  outer: while (true) {
    if (currentPositionVisitedState[`${guardDir}`]) return true;
    currentPositionVisitedState[`${guardDir}`] = true;

    // for (let i = 0; i < 3; i++) {
    const nextPos = map[guardY + guardDir[1]]?.[guardX + guardDir[0]];
    if (nextPos === undefined) return false;
    if (nextPos === null) {
      // console.log("Turn");
      guardDir = turn(guardDir);
      continue;
    }
    if (nextPos) {
      // console.log("Forward");
      guardX = guardX + guardDir[0];
      guardY = guardY + guardDir[1];
      currentPositionVisitedState = nextPos;
      continue outer;
    }
    // }
  }
}

const loops = new Set();
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const pos = map[y][x];
    if (!pos || Object.keys(pos).length === 0) continue;

    for (const rawDir in pos) {
      const [dx, dy] = rawDir.split(",").map(Number);

      if (!map[y + dy]?.[x + dx]) continue;

      const mapCopy = structuredClone(emptyMap);
      mapCopy[y + dy][x + dx] = null;

      if (guardGetsStuckInLoop(mapCopy)) {
        loops.add(`${y + dy},${x + dx}`);

        // const i = (y + dy) * (width + 1) + (x + dx);
        // text = `${text.slice(0, i)}O${text.slice(i + 1)}`;
      }
    }
  }
}

// console.log(text);
console.log({ loops: loops.size });
