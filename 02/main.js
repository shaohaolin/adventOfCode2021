const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const commands = file
  .split("\n")
  .map((line) => line.split(" "))
  .map(([direction, valueString]) => ({
    direction,
    value: parseInt(valueString),
  }));

function computePositionPartOne(commands) {
  var horizontalPosition = 0;
  var depth = 0;
  for (const command of commands) {
    switch (command.direction) {
      case "forward":
        horizontalPosition += command.value;
        break;

      case "up":
        depth -= command.value;
        break;

      case "down":
        depth += command.value;
        break;

      default:
        break;
    }
  }

  return horizontalPosition * depth;
}

function computePositionPartTwo(commands) {
  var horizontalPosition = 0;
  var depth = 0;
  var aim = 0;
  for (const command of commands) {
    switch (command.direction) {
      case "forward":
        horizontalPosition += command.value;
        depth += aim * command.value;
        break;
      case "up":
        aim -= command.value;
        break;
      case "down":
        aim += command.value;
        break;
      default:
        break;
    }
  }

  return horizontalPosition * depth;
}

console.log("Part 1 =", computePositionPartOne(commands));
console.log("Part 2 =", computePositionPartTwo(commands));
