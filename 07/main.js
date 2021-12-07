const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const desceding = (a, b) => {
  if (a - b > 0) {
    return 1;
  } else if (a - b < 0) {
    return -1;
  } else {
    return 0;
  }
};

function factorialize(num) {
  if (num < 0) return;
  else if (num == 0) return 0;
  else {
    return num + factorialize(num - 1);
  }
}

const positions = file.split(",").map((x) => parseInt(x, 10));
const sortedPositions = positions.sort(desceding);

const length = sortedPositions.length;
const biggestNumber = sortedPositions[length - 1];
const fuelArray = [];
console.log(biggestNumber);
for (let index = 0; index < biggestNumber; index++) {
  let totalFuel = 0;
  for (let crabIndex = 0; crabIndex < sortedPositions.length; crabIndex++) {
    let delta = Math.abs(sortedPositions[crabIndex] - index);
    let eachFuel = factorialize(delta);
    totalFuel = totalFuel + eachFuel;
  }
  fuelArray.push(totalFuel);
}

console.log(fuelArray.sort(desceding));
