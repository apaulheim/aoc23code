let fs = require("fs");
const { parse } = require("path");

const input = fs.readFileSync("day2.txt", { encoding: "utf8" });
const lines = input.split("\r\n");
const games = lines.map((line) => {
  let [_, setsStr] = line.split(": ");
  return setsStr.split("; ").map((set) =>
    set.split(", ").map((cube) => {
      let [num, color] = cube.split(" ");
      return { color, num: parseInt(num) };
    })
  );
});

let silver = games.reduce(
  (acc, game, index) =>
    acc +
    (game.every((set) =>
      set.every((cube) => {
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
      })
    )
      ? index + 1
      : 0),
  0
);
console.log("silver", silver); // 2416

let gold = games.reduce((acc, game) => {
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
  return acc + red * green * blue;
}, 0);
console.log("gold", gold); // 63307
