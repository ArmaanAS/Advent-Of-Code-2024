// const text = `\
// Register A: 729
// Register B: 0
// Register C: 0

// Program: 0,1,5,4,3,0`;
// const text = await Deno.readTextFile("./day_17.txt");
// const text = `\
// Register A: 0
// Register B: 2024
// Register C: 43690

// Program: 4,0`;
const text = `\
Register A: 117440
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

let [a, b, c, ...program] = [...text.matchAll(/\d+/g)].map(Number);

console.log(a, b, c, program);

const output: number[] = [];
for (let i = 0; i < program.length;) {
  const op = program[i++];
  const getCombo = () => {
    const operand = program[i++];
    console.log(`Operand: ${operand}`);
    switch (operand) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return a;
      case 5:
        return b;
      case 6:
        return c;
      default:
        throw new Error(`Invalid operand: ${operand}`);
    }
  };
  switch (op) {
    case 0: {
      a = (a / (2 ** getCombo())) | 0;
      break;
    }
    case 1: {
      b = b ^ program[i++];
      break;
    }
    case 2: {
      b = getCombo() % 8;
      break;
    }
    case 3: {
      if (a !== 0) i = program[i];
      else i += 1;
      break;
    }
    case 4: {
      i += 1;
      b = b ^ c;
      break;
    }
    case 5: {
      output.push(getCombo() % 8);
      console.log(output.at(-1));
      break;
    }
    case 6: {
      b = (a / (2 ** getCombo())) | 0;
      break;
    }
    case 7: {
      c = (a / (2 ** getCombo())) | 0;
      break;
    }
  }
  console.log(`A: ${a}\nB: ${b}\nC: ${c}\nOp: ${op}\ni = ${i}`);
}

console.log(output.join(","));
