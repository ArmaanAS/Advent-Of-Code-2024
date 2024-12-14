// const text = `\
// p=0,4 v=3,-3
// p=6,3 v=-1,-3
// p=10,3 v=-1,2
// p=2,0 v=2,-1
// p=0,0 v=1,3
// p=3,0 v=-2,-2
// p=7,6 v=-1,-3
// p=3,0 v=-1,-2
// p=9,3 v=2,3
// p=7,3 v=-1,2
// p=2,4 v=2,-3
// p=9,5 v=-3,-3`;
const text = await Deno.readTextFile("./day_14.txt");

const robots = text.split("\n").map((row) => {
  const [px, py, vx, vy] = [...row.matchAll(/-?\d+/g)].flatMap(Number);
  return {
    p: { x: px, y: py },
    v: { x: vx, y: vy },
  };
});
const robots1 = structuredClone(robots);
const robots2 = structuredClone(robots);

// const width = 11;
// const height = 7;
const width = 101;
const height = 103;
const mx = Math.floor(width / 2);
const my = Math.floor(height / 2);

// Part 1
const mod = (l: number, r: number) => ((l % r) + r) % r;
const quadRobots = [0, 0, 0, 0];
for (const { p, v } of robots1) {
  p.x = mod(p.x + v.x * 100, width);
  p.y = mod(p.y + v.y * 100, height);

  if (p.x < mx) {
    if (p.y < my) {
      quadRobots[0] += 1;
    } else if (p.y > my) {
      quadRobots[1] += 1;
    }
  } else if (p.x > mx) {
    if (p.y < my) {
      quadRobots[2] += 1;
    } else if (p.y > my) {
      quadRobots[3] += 1;
    }
  }
}

let totalMultiplied = 1;
for (const robots of quadRobots) {
  totalMultiplied *= robots;
}
console.log(quadRobots);
console.log({ totalMultiplied });

// Part 2
// function hasNearbyNeighbour(
//   map: string[][],
//   x: number,
//   y: number,
//   dist: number,
// ) {
//   if (map[y][x] === "O") return true;
//   for (let j = Math.max(-dist, 0); j <= dist && j + y < height; j++) {
//     for (let i = Math.max(-dist, 0); i <= dist && i + x < width; i++) {
//       if (map[y + j][x + i] != "." && i !== 0 && j !== 0) {
//         map[y][x] = "O";
//         map[y + j][x + i] = "O";
//         return true;
//       }
//     }
//   }
//   return false;
// }
function hasNearbyNeighbour(
  map: string[],
  x: number,
  y: number,
  dist: number,
) {
  if (map[y * width + x] === "O") return true;
  for (let j = Math.max(-dist, 0); j <= dist && j + y < height; j++) {
    for (let i = Math.max(-dist, 0); i <= dist && i + x < width; i++) {
      if (map[(y + j) * width + x + i] !== "." && i !== 0 && j !== 0) {
        map[y * width + x] = "O";
        map[(y + j) * width + x + i] = "O";
        return true;
      }
    }
  }
  return false;
}

// const emptyMap = [...new Array(height)]
//   .map(() => [...new Array(width)].fill("."));
const emptyMap: string[] = new Array(height * width).fill(".");
let now = Date.now();
for (let i = 0;; i++) {
  if (i % 1_000 === 0) {
    console.log(`[${Date.now() - now}ms] Searching... ${i}`);
    now = Date.now();
  }
  // const map = structuredClone(emptyMap);
  const map = [...emptyMap];

  for (const { p, v } of robots2) {
    p.x = mod(p.x + v.x, width);
    p.y = mod(p.y + v.y, height);
    // map[p.y][p.x] = "#";
    map[p.y * width + p.x] = "#";
  }

  let totalWithNeighbour = 0;
  for (const { p } of robots2) {
    if (hasNearbyNeighbour(map, p.x, p.y, 1)) {
      totalWithNeighbour += 1;
      if (totalWithNeighbour >= robots.length / 2.5) {
        // alert(`Index: ${i}\n${map.map((row) => row.join("")).join("\n")}`);
        alert(`${map.join("").replace(/(.{101})/g, "$1\n")} Index: ${i}`);
        break;
      }
    }
  }
}
