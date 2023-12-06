let fs = require("fs");

const input = fs.readFileSync("day6.txt", { encoding: "utf8" });
const data = input.split("\r\n");
let numberRegex = /(\d+)/g;
const times = [...data[0].matchAll(numberRegex)].map((match) =>
  parseInt(match[0])
);
const records = [...data[1].matchAll(numberRegex)].map((match) =>
  parseInt(match[0])
);
function getWaysToWin(time, record) {
  let ways = 0;
  for (let i = 1; i < time; i++) {
    const traveledDistance = (time - i) * i;
    if (traveledDistance > record) ways++;
  }
  return ways;
}
times.forEach((time, index) => {
  console.log(getWaysToWin(time, records[index]));
});
let silver = times.reduce((acc, time, index) => {
  return acc * getWaysToWin(time, records[index]);
}, 1);
console.log("silver", silver);

// PART 2
const time = parseInt(
  [...data[0].matchAll(numberRegex)].reduce((acc, match) => acc + match[0], "")
);
const record = parseInt(
  [...data[1].matchAll(numberRegex)].reduce((acc, match) => acc + match[0], "")
);
console.log("gold", getWaysToWin(time, record));
