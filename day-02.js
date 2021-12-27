#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => {
  return fs.readFileSync('./input-02.txt', 'utf8').trim().split('\n');
}

const partOne = () => {
  let horizontal = depth = 0;

  for (const line of getLines()) {
    const splitLine = line.split(' ');
    const direction = splitLine[0];
    const amount = parseInt(splitLine[1]);

    if (direction === 'forward') {
      horizontal += amount;
    } else if (direction === 'down') {
      depth += amount;
    } else if (direction === 'up') {
      depth -= amount;
    } else {
      console.error('unexpected input:', line);
    }
  }

  console.log(`${horizontal} * ${depth} = ${horizontal * depth}`);
}

const partTwo = () => {
  let horizontal = depth = aim = 0;

  for (const line of getLines()) {
    const splitLine = line.split(' ');
    const direction = splitLine[0];
    const amount = parseInt(splitLine[1]);

    if (direction === 'forward') {
      horizontal += amount;
      depth += aim * amount;
    } else if (direction === 'down') {
      aim += amount;
    } else if (direction === 'up') {
      aim -= amount;
    } else {
      console.error('unexpected input:', line);
    }
  }

  console.log(`${horizontal} * ${depth} = ${horizontal * depth}`);
}

partTwo();
