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
// const expected = [7n, 6n, 5n, 3n, 6n, 5n, 7n, 0n, 4n]; // 27334280n

const start = performance.now();
function findPossibleValuesForStep(
  targetA: bigint,
  targetB: bigint,
  depth = program.length - 1,
) {
  if (depth < 0) {
    console.log("Valid A", targetA);
    Deno.exit();
  }
  console.log(`[${depth}] targetA=${targetA}, targetB=${targetB}`);
  const valid: bigint[] = [];
  const minA = targetA << 3n;
  const maxA = minA + 8n;
  for (let a = minA; a < maxA; a++) {
    // a = val;
    // b = 0n;
    // c = 0n;

    let b = (a & 7n) ^ 2n;
    const c = a >> b;
    b = (b ^ 7n ^ c) & 7n;

    if (b === targetB) valid.push(a);
    // a >>= 3n;
  }

  console.log(valid);
  for (const val of valid) {
    findPossibleValuesForStep(val, expected[depth - 1], depth - 1);
  }
  return valid;
}

findPossibleValuesForStep(0n, expected.at(-1)!, expected.length - 1);

/*
b = (((a & 7n) ^ 2n) ^ 7n ^ (a >> ((a & 7n) ^ 2n))) & 7n
((a & 7n) ^ 2n) ^ (a >> ((a & 7n) ^ 2n)) ^ 7n = XXXXXXXXX111
(a >> ((a & 7n) ^ 2n)) ^ (a & 7n) ^ 2n = XXXXXXXXX000
(a >> ((a & 7n) ^ 2n)) ^ (a & 7n) = XXXXXXXXX010
(a >> ((a & 7n) ^ 2n)) ^ (a & 7n) = XXXXXXXXX010

*/
