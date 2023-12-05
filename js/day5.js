let fs = require("fs");

const input = fs.readFileSync("day5.txt", { encoding: "utf8" });
const data = input.split("\r\n\r\n");

function getValue(key, map) {
  for (let i = 0; i < map.length; i++) {
    if (key >= map[i].source && key < map[i].source + map[i].range) {
      return map[i].dest + (key - map[i].source);
    }
  }
  return key;
}

function getLocation(seed, maps) {
  let currentValue = seed;
  for (let i = 0; i < maps.length; i++) {
    currentValue = getValue(currentValue, maps[i]);
    // console.log(currentValue);
  }
  return currentValue;
}

const seeds = data[0]
  .split(": ")[1]
  .split(" ")
  .map((num) => parseInt(num));

const maps = [];
for (let i = 1; i < data.length; i++) {
  const rangeData = [];
  const lines = data[i].split("\r\n");
  for (let j = 1; j < lines.length; j++) {
    const [dest, source, range] = lines[j]
      .split(" ")
      .map((num) => parseInt(num));
    rangeData.push({ dest, source, range });
  }
  maps.push(rangeData);
}

const silver = Math.min(...seeds.map((seed) => getLocation(seed, maps)));
console.log("silver", silver);

// PART 2
console.time("gold");
let gold = Number.MAX_VALUE;
for (let i = 0; i < seeds.length; i += 2) {
  for (let j = 0; j < seeds[i + 1]; j++) {
    const location = getLocation(seeds[i] + j, maps);
    if (location < gold) {
      gold = location;
    }
  }
}
console.log("gold", gold);
console.timeEnd("gold");
