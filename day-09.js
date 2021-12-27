#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-09.txt', 'utf8').trim().split('\n');

const isLowPoint = (caves, row, col) => {
  if (col + 1 < caves[row].length && caves[row][col + 1] <= caves[row][col]) {
    return false;
  }

  if (row + 1 < caves.length && caves[row + 1][col] <= caves[row][col]) {
    return false;
  }

  if (row - 1 >= 0 && caves[row - 1][col] <= caves[row][col]) {
    return false;
  }

  if (col - 1 >= 0 && caves[row][col - 1] <= caves[row][col]) {
    return false;
  }

  return true;
}

const partOne = () => {
  const caves = getLines().map(line => line.split('').map(depth => parseInt(depth)));

  let totalRiskLevel = 0;
  for (let row = 0; row < caves.length; row++) {
    for (let col = 0; col < caves[row].length; col++) {
      if (isLowPoint(caves, row, col)) {
        totalRiskLevel += caves[row][col] + 1;
      }
    }
  }

  console.log('total risk level', totalRiskLevel);
};

// partOne();

const partTwo = () => {
  const caves = getLines().map(line => line.split('').map(depth => parseInt(depth)));
  console.log(caves);
}

partTwo();
