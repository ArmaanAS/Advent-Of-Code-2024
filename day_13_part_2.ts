// const text = `\
// Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400

// Button A: X+26, Y+66
// Button B: X+67, Y+21
// Prize: X=12748, Y=12176

// Button A: X+17, Y+86
// Button B: X+84, Y+37
// Prize: X=7870, Y=6450

// Button A: X+69, Y+23
// Button B: X+27, Y+71
// Prize: X=18641, Y=10279`;
const text = await Deno.readTextFile("./day_13.txt");

const games = text
  .split("\n\n")
  .map((game) => {
    const [ax, ay, bx, by, px, py] = game
      .matchAll(/(?<=[XY][+=])\d+/g)
      .map(Number);
    return {
      a: { x: ax, y: ay },
      b: { x: bx, y: by },
      prize: { x: px, y: py },
    };
  });

for (const game of games) {
  game.prize.x += 10000000000000;
  game.prize.y += 10000000000000;
}

// Part 2
let totalTokens = 0;
for (const { a, b, prize } of games) {
  const p1 = prize.x;
  const p2 = prize.y;
  const x1 = a.x;
  const x2 = b.x;
  const y1 = a.y;
  const y2 = b.y;

  const y = (x1 * p2 - y1 * p1) / (x1 * y2 - y1 * x2);
  const x = (p1 - x2 * y) / x1;
  if (y !== Math.floor(y) || x !== Math.floor(x)) continue;
  console.log({ x, y });

  // const tokens = (BigInt(p1) - BigInt(y) * BigInt(b.x)) / BigInt(a.x) * 3n +
  //   BigInt(y);
  // const tokens = (p1 - y * b.x) / a.x * 3 + y;
  const tokens = x * 3 + y;
  totalTokens += Number(tokens);
  console.log({ tokens });
}
console.log({ totalTokens });
