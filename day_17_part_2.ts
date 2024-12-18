// const text = `\
// Register A: 729
// Register B: 0
// Register C: 0

// Program: 0,1,5,4,3,0`;
const text = await Deno.readTextFile("./day_17.txt");
// const text = `\
// Register A: 0
// Register B: 0
// Register C: 0

// Program: 0,3,5,4,3,0`;

/*
Register A: 27334280
Register B: 0
Register C: 0

Program: 2,4,1,2,7,5,0,3,1,7,4,1,5,5,3,0

0 c adv A /= 1 << c
1 l bxl B ^= l
2 c bst B = c & 7
3 l jnz if (A) Jmp l
4 - bxc B ^= C
5 c out print c
6 c bdv B = A / (1 << c)
7 c cdv C = A / (1 << c)


2 4(A) B = A (& 7)
1 2    B ^= 2
7 4(B) C = A / (1 << B)
0 3(3) A /= 8 (1 << 3)
1 7    B ^= 7
4 1(-) B ^= C
5 5(B) Print B
3 0    Jmp 0 if A !== 0
*/

let [a, b, c, ...program] = [...text.matchAll(/\d+/g)].map((e) => BigInt(e[0]));
// console.log(a, b, c, program);

const expected = program;
// const expected = [7n, 6n, 5n, 3n, 6n, 5n, 7n, 0n, 4n];

let val = -1n;
outer: for (;;) {
  val++;
  if (val % 100_000_000n === 0n) console.log({ val });
  let expectedIndex = 0;
  a = val;
  b = 0n;
  c = 0n;
  while (a) {
    b = (a & 7n) ^ 2n;
    c = a >> b;
    b = (b ^ 7n ^ c) & 7n;
    // console.log(b);
    if (b !== expected[expectedIndex++]) continue outer;
    a >>= 3n;
  }

  if (expectedIndex === expected.length) break;
}

console.log({ correctVal: val });
// Deno.exit();

// let val = 0;
// outer: for (; val < 1e10; val++) {
//   if (val % 1_000_000 === 0) console.log({ val });
//   a = val;
//   let outputIndex = 0;
//   try {
//     for (let i = 0; i < program.length;) {
//       const op = program[i++];
//       const getCombo = () => {
//         const operand = program[i++];
//         // console.log(`Operand: ${operand}`);
//         switch (operand) {
//           case 0:
//             return 0;
//           case 1:
//             return 1;
//           case 2:
//             return 2;
//           case 3:
//             return 3;
//           case 4:
//             return a;
//           case 5:
//             return b;
//           case 6:
//             return c;
//           default:
//             throw new Error(`Invalid operand: ${operand}`);
//         }
//       };
//       switch (op) {
//         case 0: {
//           a = (a / (2 ** getCombo())) | 0;
//           break;
//         }
//         case 1: {
//           b = b ^ program[i++];
//           break;
//         }
//         case 2: {
//           b = getCombo() % 8;
//           break;
//         }
//         case 3: {
//           if (a !== 0) i = program[i];
//           else i += 1;
//           break;
//         }
//         case 4: {
//           i += 1;
//           b = b ^ c;
//           break;
//         }
//         case 5: {
//           const out = getCombo() % 8;
//           if (out !== program[outputIndex++]) continue outer;
//           if (outputIndex === program.length) break outer;
//           break;
//         }
//         case 6: {
//           b = (a / (2 ** getCombo())) | 0;
//           break;
//         }
//         case 7: {
//           c = (a / (2 ** getCombo())) | 0;
//           break;
//         }
//       }
//       // console.log(`A: ${a}\nB: ${b}\nC: ${c}\nOp: ${op}\ni = ${i}`);
//     }
//     // deno-lint-ignore no-empty
//   } catch (_) {}
// }

// console.log({ correctValue: val });
