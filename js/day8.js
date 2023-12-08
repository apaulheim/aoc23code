let fs = require("fs");

const input = fs.readFileSync("day8.txt", { encoding: "utf8" });
const [instructions, data] = input.split("\r\n\r\n");
const lines = data.split("\r\n");
let regex = /([A-Z0-9]+)/g;
let maps = new Map();
lines.forEach((line) => {
  const locations = [...line.matchAll(regex)];
  maps.set(locations[0][0], { L: locations[1][0], R: locations[2][0] });
});

let location = "AAA";
let steps = 0;
while (location != "ZZZ") {
  const ways = maps.get(location);
  location = ways[instructions[steps % instructions.length]];
  steps++;
}
console.log("silver", steps);

function nextLocation(location, steps) {
  const ways = maps.get(location);
  location = ways[instructions[steps % instructions.length]];
  return location;
}

function distanceToDestination(start) {
  let steps = 0;
  let location = nextLocation(start, steps);
  steps++;
  while (location[2] != "Z") {
    location = nextLocation(location, steps);
    steps++;
  }
  return { start, steps, dest: location };
}

let locations = [...maps.keys()].filter((key) => key[2] == "A");
let destinations = [...maps.keys()].filter((key) => key[2] == "Z");
// how long does it take for a destination to reach another destination?
let destinationDistances = destinations.map((dest) =>
  distanceToDestination(dest)
);
console.log("destinationDistances", destinationDistances);
// how long does it take for each start location to reach a destination?
let startDistances = locations.map((dest) => distanceToDestination(dest));
console.log("startDistances", startDistances);
// dest distances are loops and lenghts of start and dest distances are the same -> to make it easier? 🤪
// least common multiple of loop lengths?
function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
function lcmOfArray(numbers) {
  let leastcm = 1;
  for (let i = 0; i < numbers.length; i++) {
    leastcm = lcm(leastcm, numbers[i]);
  }
  return leastcm;
}
let distanceLengths = destinationDistances.map((distData) => distData.steps);
console.log("gold", lcmOfArray(distanceLengths));
