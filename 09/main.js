const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const inputs = file.split("\n").map((line) => line.split(""));
// console.log(inputs);
let result = [];
const numOfRow = inputs.length;
const numOfColumn = inputs[0].length;
for (let rowIndex = 0; rowIndex < numOfRow; rowIndex++) {
  for (let colIndex = 0; colIndex < numOfColumn; colIndex++) {
    const element = inputs[rowIndex][colIndex];

    //first row
    if (rowIndex === 0) {
      // top left
      if (colIndex === 0) {
        if (
          element < inputs[rowIndex][colIndex + 1] &&
          element < inputs[rowIndex + 1][colIndex]
        ) {
          result.push(parseInt(element));
          continue;
        }
      }

      // top right
      if (colIndex === numOfColumn - 1) {
        if (
          element < inputs[rowIndex][colIndex - 1] &&
          element < inputs[rowIndex + 1][colIndex]
        ) {
          result.push(parseInt(element));
          continue;
        }
      }

      if (
        element < inputs[rowIndex][colIndex - 1] &&
        element < inputs[rowIndex][colIndex + 1] &&
        element < inputs[rowIndex + 1][colIndex]
      ) {
        result.push(parseInt(element));
        continue;
      }
    }

    // last row
    else if (rowIndex === numOfRow - 1) {
      // bottom left
      if (colIndex === 0) {
        if (
          element < inputs[rowIndex][colIndex + 1] &&
          element < inputs[rowIndex - 1][colIndex]
        ) {
          result.push(parseInt(element));
          continue;
        }
      }

      // bottom right
      if (colIndex === numOfColumn - 1) {
        if (
          element < inputs[rowIndex][colIndex - 1] &&
          element < inputs[rowIndex - 1][colIndex]
        ) {
          result.push(parseInt(element));
          continue;
        }
      }

      if (
        element < inputs[rowIndex][colIndex - 1] &&
        element < inputs[rowIndex][colIndex + 1] &&
        element < inputs[rowIndex - 1][colIndex]
      ) {
        result.push(parseInt(element));
        continue;
      }
    }

    // first column
    else if (colIndex === 0) {
      if (
        element < inputs[rowIndex + 1][colIndex] &&
        element < inputs[rowIndex][colIndex + 1] &&
        element < inputs[rowIndex - 1][colIndex]
      ) {
        result.push(parseInt(element));
        continue;
      }
    }

    // last column
    else if (colIndex === numOfColumn - 1) {
      if (
        element < inputs[rowIndex + 1][colIndex] &&
        element < inputs[rowIndex][colIndex - 1] &&
        element < inputs[rowIndex - 1][colIndex]
      ) {
        result.push(parseInt(element));
        continue;
      }
    } else if (
      element < inputs[rowIndex + 1][colIndex] &&
      element < inputs[rowIndex][colIndex - 1] &&
      element < inputs[rowIndex - 1][colIndex] &&
      element < inputs[rowIndex][colIndex + 1]
    ) {
      result.push(parseInt(element));
      continue;
    }
  }
}

const output =
  result.reduce((previous, current) => previous + current) + result.length;
console.log(output);
