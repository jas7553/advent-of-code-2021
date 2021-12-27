#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-08.txt', 'utf8').trim().split('\n');

const partOne = () => {
  const lines = getLines();
  const groups = lines.flatMap(line => line.split(' | ')[1].split(' '));
  console.log(groups);
  const total = groups.reduce((acc, cur) => {
    return acc += ([2, 3, 4, 7].includes(cur.length) ? 1 : 0);
  }, 0);

  console.log(total);
};

partOne();
// 596 too high