#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-10.txt', 'utf8').trim().split('\n');

const openToClose = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const illegalPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const isCorrupted = (line) => {
  const charStack = [];
  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    if (openToClose[character]) {
      charStack.unshift(openToClose[character]);
    } else {
      const expected = charStack.shift();
      if (expected !== character) {
        return {
          actual: character,
          expected,
          index: i,
        };
      }
    }
  }

  return {
    charStack,
  };
}

const partOne = () => {
  const lines = getLines().map(line => line.split(''));

  let score = 0;
  for (const line of lines) {
    const corrupted = isCorrupted(line);
    if (corrupted) {
      const { actual, expected, index } = corrupted;
      console.log(`${line.join('')} - Expected ${expected}, but found ${actual} instead (at index ${index}).`);
      score += illegalPoints[actual];
    }
  }

  console.log(score);
};

// partOne();

const pointLookup = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const scoreLine = (line) => {
  return line.reduce((prev, curr) => (prev * 5) + pointLookup[curr], 0);
}

const partTwo = () => {
  const lines = getLines().map(line => line.split(''));

  const scores = [];
  for (const line of lines) {
    const result = isCorrupted(line);
    if (result.charStack) {
      const score = scoreLine(result.charStack);
      console.log(`${line} - Complete by adding ${result.charStack.join('')} - ${score} total points.`);
      scores.push(score);
    }
  }

  console.log(scores.sort((a, b) => b - a)[(scores.length - 1) / 2]);
};

partTwo();
