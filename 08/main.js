const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

let outputs = file
  .split("\n")
  .map((line) => line.split("|").splice(1))
  .flatMap((x) => x)
  .map((line) => line.split(" "))
  .flatMap((x) => x);
console.log(outputs);

// part 1
let counter = 0;
for (let index = 0; index < outputs.length; index++) {
  const element = outputs[index];
  if (
    (element.length === 2) |
    (element.length === 3) |
    (element.length === 4) |
    (element.length === 7)
  ) {
    counter++;
  }
}

console.log(counter);

// part 2
