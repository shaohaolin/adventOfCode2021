const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const inputs = file
  .split("\n")
  .map((line) => line.split("").map((x) => parseInt(x)));

const gridSize = 10;
const steps = 100;
let hasFlashPoint = [];
let numberOfFlashed = 0;

for (let stepIndex = 0; stepIndex < steps; stepIndex++) {
  hasFlashPoint = [];
  for (let rowIndex = 0; rowIndex < inputs.length; rowIndex++) {
    const row = inputs[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      increseValue(rowIndex, columnIndex);
    }
  }
  console.log(`After step ${stepIndex + 1}`);
  console.log(inputs);
}

console.log(`# of flashed: ${numberOfFlashed}`);

function increseValue(rowIndex, columnIndex) {
  const element = inputs[rowIndex][columnIndex];
  if (element === 9) {
    inputs[rowIndex][columnIndex] = 0;
    hasFlashPoint.push({
      rowIndex,
      columnIndex,
    });
    numberOfFlashed++;
    increaseNeighbour(rowIndex, columnIndex);
  } else {
    if (
      hasFlashPoint.some(
        (point) =>
          point.rowIndex === rowIndex && point.columnIndex === columnIndex
      )
    ) {
      // console.log(`octopus at x = ${rowIndex} y = ${columnIndex} flashed!`);
    } else {
      inputs[rowIndex][columnIndex] += 1;
    }
  }
}

function increaseNeighbour(rowIndex, columnIndex) {
  if (rowIndex - 1 >= 0) {
    // (x-1, y)
    increseValue(rowIndex - 1, columnIndex);

    if (columnIndex - 1 >= 0) {
      // (x-1, y-1)
      increseValue(rowIndex - 1, columnIndex - 1);
    }

    if (columnIndex + 1 < gridSize) {
      // (x-1, y+1)
      increseValue(rowIndex - 1, columnIndex + 1);
    }
  }

  if (rowIndex + 1 < gridSize) {
    // (x + 1, y)
    increseValue(rowIndex + 1, columnIndex);

    if (columnIndex - 1 >= 0) {
      // (x+1, y-1)
      increseValue(rowIndex + 1, columnIndex - 1);
    }

    if (columnIndex + 1 < gridSize) {
      // (x+1, y+1)
      increseValue(rowIndex + 1, columnIndex + 1);
    }
  }

  if (columnIndex - 1 >= 0) {
    // (x, y-1)
    increseValue(rowIndex, columnIndex - 1);
  }

  if (columnIndex + 1 < gridSize) {
    // (x, y + 1)
    increseValue(rowIndex, columnIndex + 1);
  }
}
