// const text =
//   `5,4\n4,2\n4,5\n3,0\n2,1\n6,3\n2,4\n1,5\n0,6\n3,3\n2,6\n5,1\n1,2\n5,5\n2,5\n6,5\n1,4\n0,4\n6,4\n1,1\n6,1\n1,0\n0,5\n1,6\n2,0`;
const text = await Deno.readTextFile("./day_18.txt");

const corrupted = text
  .split("\n")
  .map((row) =>
    row
      .split(",")
      .map(Number) as [number, number]
  );

// const width = 7;
// const height = 7;
const width = 71;
const height = 71;
const memory = [...new Array(height)].map(() => new Array(width).fill(0));

const bytes = [".", "#", "O"];
function logMemory(mem = memory) {
  console.log(
    mem.map((row) => row.map((i) => bytes[i]).join("")).join("\n"),
  );
}

// logMemory();

// const slice = 12;
const slice = 1024;
for (const [x, y] of corrupted.slice(0, slice)) {
  memory[y][x] = 1;
}

const initialMemory = structuredClone(memory);

const ex = width - 1;
const ey = height - 1;

interface Pos {
  x: number;
  y: number;
  score: number;
  steps: number;
}

outer: for (let i = slice; i < corrupted.length; i++) {
  const [x, y] = corrupted[i];
  initialMemory[y][x] = 1;
  console.log(`[${i}/${corrupted.length}] Corrupting (${x}, ${y})`);

  const memory = structuredClone(initialMemory);

  const positions: Pos[] = [
    { x: 0, y: 0, score: ex + ey, steps: 0 },
  ];
  while (positions.length) {
    const { x, y, steps } = positions.pop()!;

    if (x === ex && y === ey) {
      // logMemory();
      console.log("Steps", steps);
      continue outer;
    }
    if (memory[y - 1]?.[x] === 0) {
      memory[y - 1][x] = 2;
      positions.push({
        x,
        y: y - 1,
        steps: steps + 1,
        score: (x * 2 + (y - 1) * 2 - ex - ey),
      });
    }
    if (memory[y + 1]?.[x] === 0) {
      memory[y + 1][x] = 2;
      positions.push({
        x,
        y: y + 1,
        steps: steps + 1,
        score: (x * 2 + (y + 1) * 2 - ex - ey),
      });
    }
    if (memory[y][x - 1] === 0) {
      memory[y][x - 1] = 2;
      positions.push({
        x: x - 1,
        y,
        steps: steps + 1,
        score: ((x - 1) * 2 + y * 2 - ex - ey),
      });
    }
    if (memory[y][x + 1] === 0) {
      memory[y][x + 1] = 2;
      positions.push({
        x: x + 1,
        y,
        steps: steps + 1,
        score: ((x + 1) * 2 + y * 2 - ex - ey),
      });
    }

    positions.sort((a, b) => b.steps - a.steps + b.score - a.score);
    // positions.sort((a, b) => b.steps - a.steps);
    // positions.sort((a, b) => b.score - a.score);
  }

  logMemory(memory);
  console.log(`No solution found for (${x}, ${y})`);
  break;
}

// logMemory();
