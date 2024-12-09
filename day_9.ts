// const text = "2333133121414131402";
const text = await Deno.readTextFile("day_9.txt");

const data = text.split("").map(Number);

// Part 1
const expandedData = [];
for (let i = 0; i < data.length; i++) {
  if (i % 2 === 0) {
    expandedData.push(...new Array(data[i]).fill(i / 2));
  } else {
    expandedData.push(...new Array(data[i]));
  }
}

const compressedData = [...expandedData];
for (let i = compressedData.length - 1; i >= 0; i--) {
  const id = compressedData[i];
  if (id === undefined) continue;

  const emptyIndex = compressedData.indexOf(undefined);
  if (emptyIndex === -1 || emptyIndex > i) break;

  compressedData[emptyIndex] = id;
  compressedData[i] = undefined;
}

console.log(compressedData);

let checksum = 0;
for (let i = 0; compressedData[i] !== undefined; i++) {
  checksum += compressedData[i] * i;
}

console.log({ checksum });

// Part 2
interface File {
  type: "file";
  id: number;
  size: number;
}
interface Space {
  type: "space";
  size: number;
}
const fileSystem: (File | Space)[] = [];
for (let i = 0; i < data.length; i++) {
  if (i % 2 === 0) {
    fileSystem.push({
      type: "file",
      id: i / 2,
      size: data[i],
    });
  } else {
    fileSystem.push({
      type: "space",
      size: data[i],
    });
  }
}

const fileSysText = fileSystem.flatMap((f) =>
  new Array(f.size).fill("id" in f ? f.id : ".")
).join("");
console.log(fileSysText);

for (let i = fileSystem.length - 1; i >= 0; i--) {
  const file = fileSystem[i];
  if (file.type === "space") continue;

  const spaceIndex = fileSystem.findIndex((space) =>
    space.type === "space" && space.size >= file.size
  );

  if (spaceIndex > i || spaceIndex === -1) continue;

  const space = fileSystem[spaceIndex];
  // Remove file
  // Set old file to space (combine with nearest spaces left and right)
  if (
    fileSystem[i - 1]?.type === "space" &&
    fileSystem[i + 1]?.type === "space"
  ) {
    const totalSpace = fileSystem[i - 1].size + fileSystem[i + 1].size +
      file.size;
    fileSystem.splice(i, 2);
    fileSystem[i - 1].size = totalSpace;
  } else if (fileSystem[i - 1]?.type === "space") {
    fileSystem[i - 1].size += file.size;
    fileSystem.splice(i, 1);
  } else if (fileSystem[i + 1]?.type === "space") {
    fileSystem[i + 1].size += file.size;
    fileSystem.splice(i, 1);
    i++;
  } else {
    fileSystem[i] = {
      type: "space",
      size: file.size,
    };
  }

  if (file.size === space.size) {
    // Replace space with file
    fileSystem[spaceIndex] = file;
  } else {
    // Insert file before space
    fileSystem.splice(spaceIndex, 0, file);
    // Shrink space
    space.size -= file.size;
    i++;
  }

  // const compressedFileSysText = fileSystem.flatMap((f) =>
  //   new Array(f.size).fill("id" in f ? f.id : ".")
  // ).join("");
  // console.log(compressedFileSysText);
}

// Calculate checksum
let total = 0;
let i = 0;
for (const file of fileSystem) {
  if (file.type === "space") {
    i += file.size;
    continue;
  }

  const end = i + file.size;
  for (; i < end; i++) {
    total += file.id * i;
  }
}

console.log({ total });
