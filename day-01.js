#! /usr/local/bin/node

const fs = require('fs');

const numbers = fs.readFileSync('./input-01.txt', 'utf8').trim().split('\n').map(i => parseInt(i));

let count = 0;
let previousSum;
for (let i = 0; i < numbers.length - 2; i++) {
  const currentSum = numbers[i] + numbers[i + 1] + numbers[i + 2];
  if (previousSum && previousSum < currentSum) {
    count++;
  }

  previousSum = currentSum;
}

console.log(count);
