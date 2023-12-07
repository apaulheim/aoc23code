let fs = require("fs");

const input = fs.readFileSync("day7.txt", { encoding: "utf8" });
const data = input.split("\r\n");

function getHandType(hand) {
  const map = new Map();
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (map.has(card)) {
      map.set(card, map.get(card) + 1);
    } else {
      map.set(card, 1);
    }
  }
  mapValues = [...map.values()].sort((a, b) => b - a);
  let type = 0;
  if (mapValues[0] == 5) {
    type = 6;
  } else if (mapValues[0] == 4) {
    type = 5;
  } else if (mapValues[0] == 3 && mapValues[1] == 2) {
    type = 4;
  } else if (mapValues[0] == 3) {
    type = 3;
  } else if (mapValues[0] == 2 && mapValues[1] == 2) {
    type = 2;
  } else if (mapValues[0] == 2) {
    type = 1;
  } else {
    type = 0;
  }
  return type;
}

function getHandTypeGold(hand) {
  const map = new Map();
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (map.has(card)) {
      map.set(card, map.get(card) + 1);
    } else {
      map.set(card, 1);
    }
  }
  let mapEntries = Array.from(map, ([key, value]) => ({ key, value }));
  mapEntries = mapEntries.sort((a, b) => b.value - a.value);
  mapValues0 = mapEntries[0].value;
  mapValues1 = mapEntries.length > 1 ? mapEntries[1].value : 0;
  if (map.has("J")) {
    jIndex = mapEntries.findIndex((entry) => entry.key == "J");
    jValue = mapEntries[jIndex].value;
    if (jIndex == 0) {
      mapValues0 =
        mapEntries.length > 1 ? mapEntries[1].value + jValue : jValue;
      mapValues1 = mapEntries.length > 2 ? mapEntries[2].value : 0;
    } else if (jIndex == 1) {
      mapValues0 = mapEntries[0].value + jValue;
      mapValues1 = mapEntries.length > 2 ? mapEntries[2].value : 0;
    } else {
      mapValues0 = mapEntries[0].value + jValue;
      mapValues1 = mapEntries.length > 1 ? mapEntries[1].value : 0;
    }
  }
  let type = 0;
  if (mapValues0 == 5) {
    type = 6;
  } else if (mapValues0 == 4) {
    type = 5;
  } else if (mapValues0 == 3 && mapValues1 == 2) {
    type = 4;
  } else if (mapValues0 == 3) {
    type = 3;
  } else if (mapValues0 == 2 && mapValues1 == 2) {
    type = 2;
  } else if (mapValues0 == 2) {
    type = 1;
  } else {
    type = 0;
  }
  return type;
}

const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
const cardValuesGold = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];
function compareCards(a, b, cardValues) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] == b[i]) continue;
    else return cardValues.indexOf(a[i]) - cardValues.indexOf(b[i]);
  }
}

let handsSorted = [];
for (let i = 0; i < data.length; i++) {
  const [hand, bid] = data[i].split(" ");
  handsSorted.push({ hand, bid, type: getHandType(hand) });
}
handsSorted.sort((a, b) => {
  if (a.type == b.type) {
    return compareCards(a.hand, b.hand, cardValues);
  }
  return a.type - b.type;
});
const silver = handsSorted.reduce(
  (acc, hand, index) => acc + hand.bid * (index + 1),
  0
);
// console.log(handsSorted);
console.log("silver", silver);

let handsSortedGold = [];
for (let i = 0; i < data.length; i++) {
  const [hand, bid] = data[i].split(" ");
  handsSortedGold.push({ hand, bid, type: getHandTypeGold(hand) });
}
handsSortedGold.sort((a, b) => {
  if (a.type == b.type) {
    return compareCards(a.hand, b.hand, cardValuesGold);
  }
  return a.type - b.type;
});
const gold = handsSortedGold.reduce(
  (acc, hand, index) => acc + hand.bid * (index + 1),
  0
);
console.log(handsSortedGold);
console.log("gold", gold);
