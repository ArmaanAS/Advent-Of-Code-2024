// const text = `\
// ##########
// #..O..O.O#
// #......O.#
// #.OO..O.O#
// #..O@..O.#
// #O#..O...#
// #O..O..O.#
// #.OO.O.OO#
// #....O...#
// ##########

// <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
// vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
// ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
// <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
// ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
// ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
// >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
// <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
// ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
// v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;
const text = await Deno.readTextFile("./day_15.txt");
// const text = `\
// #######
// #...#.#
// #.....#
// #..OO@#
// #..O..#
// #.....#
// #######

// <vv<<^^<<^^`;

const [mapText, movesText] = text.split("\n\n");

const moves = movesText.replaceAll("\n", "");
let map = mapText
  .split("\n")
  // .slice(1, -1)
  .map((row) =>
    row
      .split("")
      // .slice(1, -1)
      .flatMap((e) => {
        switch (e) {
          case "#":
            return ["#", "#"];
          case "O":
            return ["[", "]"];
          case ".":
            return [".", "."];
          case "@":
          default:
            return ["@", "."];
        }
      })
  );

const width = map[0].length;
const height = map.length;

// console.log(map);
// console.log(moves);

let robotX = 0;
let robotY = 0;
outer: for (let y = 1; y < height - 1; y++) {
  for (let x = 2; x < width - 2; x++) {
    if (map[y][x] === "@") {
      robotX = x;
      robotY = y;
      map[y][x] = ".";
      break outer;
    }
  }
}

function moveBox(x: number, y: number, dir: { x: number; y: number }) {
  if (map[y][x] === ".") return true;

  const x1 = map[y][x] === "[" ? x : x - 1;
  const x2 = map[y][x] === "[" ? x + 1 : x;
  if (dir.x) {
    const nx = dir.x === 1 ? x2 + 1 : x1 - 1;
    const place = map[y]?.[nx];
    // Check next pos is wall / out of bounds
    if (place === "#") return false;
    // Check next pos is empty
    if (place === "." || moveBox(nx, y, dir)) {
      if (dir.x === 1) {
        map[y][x1] = ".";
        map[y][x2] = "[";
        map[y][nx] = "]";
      } else {
        map[y][x2] = ".";
        map[y][x1] = "]";
        map[y][nx] = "[";
      }
      return true;
    }
  } else {
    const ny = y + dir.y;
    const place1 = map[ny]?.[x1];
    const place2 = map[ny]?.[x2];
    // Check next pos's are walls / out of bounds
    if (place1 === "#" || place2 === "#") return false;
    // Check next pos's are empty
    if (place1 === "." && place2 === ".") {
      map[ny][x1] = "[";
      map[ny][x2] = "]";
      map[y][x1] = ".";
      map[y][x2] = ".";
      return true;
    }
    // Next pos's are 1 or 2 boxes
    if (place1 === "[" && !moveBox(x1, ny, dir)) return false;
    if (place1 === "]" && !moveBox(x1, ny, dir)) return false;
    if (place2 === "[" && !moveBox(x2, ny, dir)) return false;
    map[ny][x1] = "[";
    map[ny][x2] = "]";
    map[y][x1] = ".";
    map[y][x2] = ".";
    return true;
  }
  // throw new Error("Unreachable code");
  return false;
}

function getMoveDir(move: string) {
  switch (move) {
    case "<":
      return { x: -1, y: 0 };
    case ">":
      return { x: 1, y: 0 };
    case "^":
      return { x: 0, y: -1 };
    case "v":
      return { x: 0, y: 1 };
  }
  throw new Error(`Unknown move: ${move}`);
}

// Part 2
for (const move of moves) {
  const currentMap = structuredClone(map);
  // map[robotY][robotX] = "@";
  // console.log(map.map((row) => row.join("")).join("\n") + "\n" + move);
  // map[robotY][robotX] = ".";

  const dir = getMoveDir(move);

  const rx = robotX + dir.x;
  const ry = robotY + dir.y;
  const place = map[ry]?.[rx];
  if (place === "#") continue;
  if (place === "." || moveBox(rx, ry, dir)) {
    robotX = rx;
    robotY = ry;
  } else {
    map = currentMap;
  }
}

map[robotY][robotX] = "@";
console.log(map.map((row) => row.join("")).join("\n"));

let totalGPS = 0;
for (let y = 1; y < height - 1; y++) {
  for (let x = 2; x < width - 2; x++) {
    if (map[y][x] === "[") totalGPS += y * 100 + x;
  }
}
console.log({ totalGPS });
