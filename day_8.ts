// const text = `\
// ............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`;
const text = await Deno.readTextFile("day_8.txt");

const map = text.split("\n").map((row) => row.split(""));

const height = map.length;
const width = map[0].length;

// Part 1
const frequencies: Record<string, [number, number][]> = {};

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const freq = map[y][x];
    if (freq === ".") continue;

    frequencies[freq] ??= [];
    frequencies[freq].push([x, y]);
  }
}

const antinodes = new Set();
for (const freq in frequencies) {
  const positions = frequencies[freq];
  if (positions.length === 1) continue;

  for (let i = 0; i < positions.length - 1; i++) {
    const [x1, y1] = positions[i];
    for (let j = i + 1; j < positions.length; j++) {
      const [x2, y2] = positions[j];

      const dx = x1 - x2;
      const dy = y1 - y2;
      const [ax1, ay1] = [x1 + dx, y1 + dy];
      const [ax2, ay2] = [x2 - dx, y2 - dy];

      if (map[ay1]?.[ax1]) antinodes.add(`${ax1},${ay1}`);
      if (map[ay2]?.[ax2]) antinodes.add(`${ax2},${ay2}`);
    }
  }
}

console.log(antinodes.size);

// Part 2
const harmonicAntinodes = new Set();
for (const freq in frequencies) {
  const positions = frequencies[freq];
  if (positions.length === 1) continue;

  for (let i = 0; i < positions.length - 1; i++) {
    const [x1, y1] = positions[i];
    for (let j = i + 1; j < positions.length; j++) {
      const [x2, y2] = positions[j];

      const dx = x1 - x2;
      const dy = y1 - y2;
      let [ax1, ay1] = [x1, y1];
      while (map[ay1]?.[ax1]) {
        harmonicAntinodes.add(`${ax1},${ay1}`);
        ax1 += dx;
        ay1 += dy;
      }
      let [ax2, ay2] = [x2, y2];
      while (map[ay2]?.[ax2]) {
        harmonicAntinodes.add(`${ax2},${ay2}`);
        ax2 -= dx;
        ay2 -= dy;
      }
    }
  }
}

console.log(harmonicAntinodes.size);
