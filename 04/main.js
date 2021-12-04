const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const input = file.split(/\n/);
const draws = input[0].split(",").map((number) => parseInt(number));
const boards = [];
const rawBoards = input.slice(1).map((line) => {
  if (line === "") {
    boards.push([]);
  } else {
    boards[boards.length - 1].push(
      line
        .split(" ")
        .filter((num) => num !== "")
        .map((num) => ({
          isMatched: false,
          value: parseInt(num),
        }))
    );
  }
});
// console.log(input);
// console.log(draws);
// console.log(boards[2]);

// find the number on the board and set isMatched to true
function findMatchesNumber(selectedNumber, board) {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < board[rowIndex].length;
      columnIndex++
    ) {
      const element = board[rowIndex][columnIndex];
      if (element.value === selectedNumber) {
        element.isMatched = true;
        break;
      }
    }
  }
}

function checkWinner(board) {
  // check each row to have five isMatched to be true
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    if (board[rowIndex].filter((element) => element.isMatched).length === 5) {
      console.log(`Row Bingo!`);
      console.log(JSON.stringify(board[rowIndex]));
      return true;
    }
  }

  // check each column to have five isMatched to be true
  for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
    let matchesColumn = [];
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      const element = board[rowIndex][columnIndex];
      if (element.isMatched) {
        matchesColumn.push(element);
        if (matchesColumn.length === 5) {
          console.log(`Column Bingo!`);
          console.log(JSON.stringify(matchesColumn));
          return true;
        }
      }
    }
  }

  return false;
}

// Sum up any number in the board that isMatched is false
// And then multiply the sum with given number
function calculateReslt(board, number) {
  let sum = 0;
  for (let index = 0; index < board.length; index++) {
    for (let column = 0; column < board[index].length; column++) {
      const element = board[index][column];
      if (!element.isMatched) {
        sum += element.value;
      }
    }
  }

  console.log(sum * number);
}

let isBingo = false;

for (let index = 0; index < draws.length; index++) {
  const selectedNumber = draws[index];

  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    findMatchesNumber(selectedNumber, boards[boardIndex]);
    if (checkWinner(boards[boardIndex])) {
      console.log(`Bingo on board ${boardIndex}`);
      calculateReslt(boards[boardIndex], selectedNumber);
      isBingo = true;
      break;
    }
  }
  if (isBingo) break;
}
