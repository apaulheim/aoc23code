let fs = require('fs');
const { parse } = require('path');

const input1 = fs.readFileSync("day1.txt", { encoding: 'utf8' });
const input2 = input1

// const input1 = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`

// const input2 = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
// eighthree
// sevenine
// `

const lines1 = input1
  .split("\n");
const lines2 = input2
  .split("\n");

let regex1 = /\d/g;
let regex2 = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
let wordToNum = new Map();
wordToNum.set('one', 1);
wordToNum.set('two', 2);
wordToNum.set('three', 3);
wordToNum.set('four', 4);
wordToNum.set('five', 5);
wordToNum.set('six', 6);
wordToNum.set('seven', 7);
wordToNum.set('eight', 8);
wordToNum.set('nine', 9);

let silver = 0;
let gold = 0;

for(let i = 0 ; i < lines1.length; i++) {
    let result = lines1[i].match(regex1);
    let firstNum = parseInt(result[0]);
    let lastNum = parseInt(result[result.length-1]);
    silver += parseInt(`${firstNum}${lastNum}`);
}

for(let i = 0 ; i < lines2.length; i++) {
    let result = [...lines2[i].matchAll(regex2)];
    let firstNum = wordToNum.has(result[0][1]) ?  wordToNum.get(result[0][1]) : parseInt(result[0][1]);
    let lastNum = wordToNum.has(result[result.length-1][1]) ?  wordToNum.get(result[result.length-1][1]) : parseInt(result[result.length-1][1]);
    gold += parseInt(`${firstNum}${lastNum}`);
}

console.log("silver", silver);
console.log("gold", gold);