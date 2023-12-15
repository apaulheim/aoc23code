const exp = require("constants");
let fs = require("fs");

const input = fs.readFileSync("day15.txt", { encoding: "utf8" });
const data = input.split(",");

function getHash(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash += value[i].charCodeAt();
    hash *= 17;
    hash %= 256;
  }
  return hash;
}

let silver = data.map((value) => getHash(value)).reduce((acc, v) => acc + v, 0);

console.log("silver", silver);

// Part 2
const labelRegex = /([a-z]+)/g;
const removeOrAddRegex = /[-=]/g;
const focalLengthRegex = /[0-9]/g;
const boxes = [];
for (let i = 0; i < 256; i++) {
  boxes.push([]);
}
for (let i = 0; i < data.length; i++) {
  let lensLabel = data[i].match(labelRegex)[0];
  let boxId = getHash(lensLabel);
  let remove = data[i].match(removeOrAddRegex)[0] == "-";
  let existingLensId = boxes[boxId].findIndex(
    (value) => value.label == lensLabel
  );
  if (remove) {
    if (existingLensId >= 0) boxes[boxId].splice(existingLensId, 1);
  } else {
    let focalLength = parseInt(data[i].match(focalLengthRegex)[0]);
    if (existingLensId >= 0) boxes[boxId][existingLensId].focal = focalLength;
    else
      boxes[boxId].push({
        label: lensLabel,
        focal: focalLength,
      });
  }
}

const gold = boxes.reduce(
  (acc, box, boxId) =>
    acc +
    box.reduce(
      (acc, lens, lensPos) => acc + (boxId + 1) * (lensPos + 1) * lens.focal,
      0
    ),
  0
);
console.log("gold", gold);
