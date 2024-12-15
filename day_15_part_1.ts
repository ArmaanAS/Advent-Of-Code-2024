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

const [mapText, movesText] = text.split("\n\n");

const moves = movesText.replaceAll("\n", "");
const map = mapText
  .split("\n")
  .map((row) =>
    row
      .split("")
      .slice(1, -1)
  )
  .slice(1, -1);

const width = map[0].length;
const height = map.length;

// console.log(map);
// console.log(moves);

let robotX = 0;
let robotY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] === "@") {
      robotX = x;
      robotY = y;
      map[y][x] = ".";
      break;
    }
  }
}

// Part 1
for (const move of moves) {
  const dir = move === "<"
    ? { x: -1, y: 0 }
    : move === ">"
    ? { x: 1, y: 0 }
    : move === "v"
    ? { x: 0, y: 1 }
    : { x: 0, y: -1 };

  const rx = robotX + dir.x;
  const ry = robotY + dir.y;
  let place = map[ry]?.[rx];
  if (!place || place === "#") continue;
  if (place === ".") {
    robotX = rx;
    robotY = ry;
    continue;
  }
  let bx = rx;
  let by = ry;
  while (place === "O") {
    bx += dir.x;
    by += dir.y;
    place = map[by]?.[bx];
  }
  if (!place || place === "#") continue;
  map[ry][rx] = ".";
  map[by][bx] = "O";
  robotX = rx;
  robotY = ry;
  // console.log(map.map((row) => row.join("")).join("\n") + "\n\n");
}

map[robotY][robotX] = "@";
console.log(map.map((row) => row.join("")).join("\n"));

let totalGPS = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x] !== "O") continue;
    const gpsIndex = (y + 1) * 100 + (x + 1);
    totalGPS += gpsIndex;
  }
}
console.log({ totalGPS });
