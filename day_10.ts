// const text = `\
// 89010123
// 78121874
// 87430965
// 96549874
// 45678903
// 32019012
// 01329801
// 10456732`;
const text = await Deno.readTextFile("./day_10.txt");

const map = text.split("\n").map((row) => row.split("").map(Number));

const width = map[0].length;
const height = map.length;

// Part 1
const all0Positions: [number, number][] = [];
let index = -1;
while (true) {
  index = text.indexOf("0", index + 1);
  if (index === -1) break;

  const x = index % (width + 1);
  const y = (index / (width + 1)) | 0;
  all0Positions.push([x, y]);
}

function getNeighboursAbove(x: number, y: number) {
  const val = map[y]?.[x];
  if (val === undefined) return [];

  const neighbours: [number, number][] = [];
  if (map[y + 1]?.[x] === val + 1) neighbours.push([x, y + 1]);
  if (map[y - 1]?.[x] === val + 1) neighbours.push([x, y - 1]);
  if (map[y]?.[x + 1] === val + 1) neighbours.push([x + 1, y]);
  if (map[y]?.[x - 1] === val + 1) neighbours.push([x - 1, y]);

  return neighbours;
}

let totalTrails = 0;
let totalUniqueTrails = 0;
for (const pos of all0Positions) {
  let trails = [pos];
  outer: while (true) {
    const newTrails: typeof trails = [];
    for (const [x, y] of trails) {
      const val = map[y][x];
      if (val === 9) {
        const uniquePeaks = new Set(trails.map(([x, y]) => `${x},${y}`));
        totalTrails += uniquePeaks.size;
        totalUniqueTrails += trails.length;
        // console.log(totalTrails);
        break outer;
      }

      newTrails.push(...getNeighboursAbove(x, y));
    }
    if (newTrails.length === 0) break;
    trails = newTrails;
  }
}

console.log({ totalTrails });
console.log({ totalUniqueTrails });
