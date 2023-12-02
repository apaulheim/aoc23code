let fs = require("fs");
const { parse } = require("path");

const input = fs.readFileSync("day2.txt", { encoding: "utf8" });
const lines = input.split("\r\n");
const games = lines.map((line) => {
  let [num, setsStr] = line.split(": ");
  let sets = setsStr.split("; ").map((set) => {
    let cubes = set.split(", ").map((cube) => {
      let [num, color] = cube.split(" ");
      return { color, num: parseInt(num) };
    });
    return cubes;
  });
  return sets;
});
let silver = 0;
games.forEach((game, index) => {
  const valid = game.every((set) => {
    return set.every((cube) => {
      switch (cube.color) {
        case "red":
          return cube.num <= 12;
        case "green":
          return cube.num <= 13;
        case "blue":
          return cube.num <= 14;
        default:
          console.warn("parsing error");
          return false;
      }
    });
  });
  if (valid) {
    silver += index + 1;
  }
});
console.log(silver);

let gold = 0;
games.forEach((game, index) => {
  let red = 0;
  let green = 0;
  let blue = 0;
  game.forEach((set) => {
    return set.forEach((cube) => {
      switch (cube.color) {
        case "red":
          red = Math.max(red, cube.num);
          break;
        case "green":
          green = Math.max(green, cube.num);
          break;
        case "blue":
          blue = Math.max(blue, cube.num);
          break;
        default:
          console.warn("parsing error");
      }
    });
  });
  gold += red * green * blue;
});
console.log("gold", gold);
