let fs = require("fs");

const input = fs.readFileSync("day12.txt", { encoding: "utf8" });
const rows = input.split("\n");

const testAgainstPattern = (pattern, springs) => {
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] == "#" && springs[i] != "#") {
      return false;
    }
  }
  return true;
};

for (let i = 0; i < rows.length; i++) {
  let arrangements = 0;
  const [pattern, springsStr] = rows[i].split(" ");
  const springs = springsStr.split(",").map((s) => parseInt(s));
  const roomsBetweenSprings = springs.length; // including room at the start
  const totalOperational = pattern.length - springs.reduce((a, b) => a + b, 0); // total number of '.'
  const maximumRoom = totalOperational - (roomsBetweenSprings - 2);
  const maximumRoomAtStart = maximumRoom - 1;

  // 0 1 1 1
  // 1 1 1 1
  // 0 2 1 1
  // 0 1 2 1
  // 0 1 1 2

  for (let j = 0; j <= roomsBetweenSprings; j++) {
    if (j == 0) {
    } else {
      for (let k = 0; k < maximumRoom; k++) {}
    }
  }
}
