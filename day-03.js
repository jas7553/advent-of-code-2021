#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => {
  return fs.readFileSync('./input-03.txt', 'utf8').trim().split('\n');
}

const partOne = () => {
  const lines = getLines();
  const counters = Array(lines[0].length).fill(0);

  for (const line of lines) {
    for (const [index, digit] of line.split('').entries()) {
      counters[index] += parseInt(digit);
    }
  }

  let gammaRate = '', epsilonRate = '';
  for (const counter of counters) {
    if (counter > lines.length / 2) {
      gammaRate += '1';
      epsilonRate += '0';
    } else {
      gammaRate += '0';
      epsilonRate += '1';
    }
  }

  const gamma = parseInt(gammaRate, 2);
  const epsilon = parseInt(epsilonRate, 2);

  console.log(`Part 1: ${gamma} * ${epsilon} = ${gamma * epsilon}`);
}

partOne();

const partTwo = () => {
  const getMostPopularBits = (lines) => {
    const counters = Array(lines[0].length).fill(0);
    for (const line of lines) {
      for (const [index, digit] of line.split('').entries()) {
        if (digit === '1') {
          counters[index]++;
        } else {
          counters[index]--;
        }
      }
    }

    return counters.map(counter => counter >= 0 ? '1' : '0');
  };

  const lines = getLines();
  const bitCount = lines[0].length;

  let oxygenGeneratorRating;
  let remainingLines = lines;
  for (let bitPosition = 0; bitPosition < bitCount; bitPosition++) {
    const popularity = getMostPopularBits(remainingLines);
    remainingLines = remainingLines.filter(line => line[bitPosition] === popularity[bitPosition]);
    if (remainingLines.length === 1) {
      oxygenGeneratorRating = parseInt(remainingLines[0], 2);
      break;
    }
  }

  let co2ScrubberRating;
  remainingLines = lines;
  for (let bitPosition = 0; bitPosition < bitCount; bitPosition++) {
    const popularity = getMostPopularBits(remainingLines);
    remainingLines = remainingLines.filter(line => line[bitPosition] !== popularity[bitPosition]);
    if (remainingLines.length === 1) {
      co2ScrubberRating = parseInt(remainingLines[0], 2);
      break;
    }
  }

  console.log(`Part 2: ${oxygenGeneratorRating} * ${co2ScrubberRating} = ${oxygenGeneratorRating * co2ScrubberRating}`);
}

partTwo();
