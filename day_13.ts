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
    // console.log(ax, ay, bx, by, px, py);
    return {
      a: { x: ax, y: ay },
      b: { x: bx, y: by },
      // prize: { x: px + 10000000000000, y: py + 10000000000000 },
      prize: { x: px, y: py },
    };
  });

// Part 1
const start = performance.now();
let totalTokens = 0;
game: for (const { a, b, prize } of games) {
  let minTokens = Infinity;
  let currentTokens = 0;
  for (let x = 0, y = 0; x < prize.x && y < prize.y; x += a.x, y += a.y) {
    const dx = prize.x - x;
    const dy = prize.y - y;

    if (dx % b.x === 0 && dy % b.y === 0 && dx / b.x === dy / b.y) {
      const tokens = currentTokens + dx / b.x;
      if (tokens < minTokens) {
        minTokens = tokens;
      } else {
        totalTokens += minTokens;
        continue game;
      }
    }

    currentTokens += 3;
  }

  if (minTokens !== Infinity) totalTokens += minTokens;
}

console.log(`${performance.now() - start}ms`);
console.log({ totalTokens });

// Part 2
const mod = (left: number, right: number) => ((left % right) + right) % right;
function cycleLengthAndOffset(a: number, b: number, p: number) {
  let offset = -1;
  for (let i = 0; p >= 0; i++, p -= a) {
    if (i > b + offset) {
      // console.log("Force break cycle");
      return;
    }
    const rem = p % b;
    if (rem === 0) {
      if (offset === -1) {
        offset = i;
      } else {
        return { offset, cycle: i - offset };
      }
    }
  }
}

for (const game of games) {
  game.prize.x += 10000000000000;
  game.prize.y += 10000000000000;
}

let totalTokens2 = 0;
game: for (const { a, b, prize } of games) {
  const cx = cycleLengthAndOffset(a.x, b.x, prize.x);
  const cy = cycleLengthAndOffset(a.y, b.y, prize.y);
  console.log(cx);
  console.log(cy);
  if (!cx || !cy) continue;

  let ix = cx.offset;
  let iy = cy.offset;
  let px = prize.x;
  let py = prize.y;
  // let i = 0;
  while (px >= 0 && py >= 0) {
    // if (i++ > cx.cycle * cy.cycle) {
    //   console.log("Force break");
    //   continue game;
    // }
    if (ix === iy) {
      totalTokens2 += ix * 3 + (prize.x - a.x * ix) / b.x;
      console.log({ ix, totalTokens2 });
      continue game;
    }
    if (ix < iy) {
      ix += cx.cycle;
      px -= a.x * cx.cycle;
    } else {
      iy += cy.cycle;
      py -= a.y * cy.cycle;
    }
  }
  console.log("Unsolvable");
}

console.log({ totalTokens2 });
// let i = 0;
// for (let x = 0, y = 0; x < prize.x && y < prize.y; x += a.x, y += a.y) {
//   console.log(
//     i,
//     (prize.x - x).toString().padStart(4, " "),
//     mod(prize.x - x, b.x).toString().padStart(3, " "),
//     mod(prize.y - y, b.y).toString().padStart(3, " "),
//   );
//   i++;
// }

// const start1 = performance.now();
// totalTokens = 0;
// game: for (const { a, b, prize } of games) {
//   let minTokens = Infinity;
//   let currentTokens = 0;
//   for (let x = 0, y = 0; x < prize.x && y < prize.y; x += a.x, y += a.y) {
//     const dx = prize.x - x;
//     const dy = prize.y - y;

//     if (dx % b.x === 0 && dy % b.y === 0 && dx / b.x === dy / b.y) {
//       const tokens = currentTokens + dx / b.x;
//       if (tokens < minTokens) {
//         minTokens = tokens;
//       } else {
//         totalTokens += minTokens;
//         continue game;
//       }
//     }

//     currentTokens += 3;
//   }

//   if (minTokens !== Infinity) totalTokens += minTokens;
// }

// console.log(`${performance.now() - start1}ms`);
// console.log({ totalTokens });
