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

const positions = file.split(",").map((x) => parseInt(x, 10));
const sortedPositions = positions.sort(desceding);

const length = sortedPositions.length;
const biggestNumber = sortedPositions[length - 1];
const fuelArray = [];
for (let index = 0; index < biggestNumber; index++) {
  let totalFuel = 0;
  for (let crabIndex = 0; crabIndex < sortedPositions.length; crabIndex++) {
    let delta = Math.abs(sortedPositions[crabIndex] - index);
    let eachFuel = (delta * (delta + 1)) / 2;
    totalFuel = totalFuel + eachFuel;
  }
  fuelArray.push(totalFuel);
}

console.log(fuelArray.sort(desceding));
