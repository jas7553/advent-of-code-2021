#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-06.txt', 'utf8').trim().split('\n');

const day = (lanternFish) => {
  let newFishCount = 0;
  const nextDayFish = lanternFish.map(f => {
    if (f === 0) {
      newFishCount += 1;
      return 6;
    }

    return f - 1;
  });

  const newFishSpawns = Array(newFishCount).fill(8);
  nextDayFish.push(...newFishSpawns);

  return nextDayFish;
}

const partOne = () => {
  const lines = getLines();
  let lanternFish = lines[0].split(',').map(f => parseInt(f));

  for (let i = 0; i < 256; i++) {
    lanternFish = day(lanternFish);
  }
  
  console.log('lantern fish population:', lanternFish.length);
};

// partOne();

const frequency = (lanternFish) => {
  const frequency = new Map();
  for (const fish of lanternFish) {
    if (frequency.has(fish)) {
      frequency.set(fish, frequency.get(fish) + 1);
    } else {
      frequency.set(fish, 1);
    }
  }

  return frequency;
};

const nextDay = (lanternFish) => {
  const newFish = new Map();
  for (const [fish, population] of lanternFish) {
    if (fish === 0) {
      if (newFish.has(6)) {
        newFish.set(6, newFish.get(6) + population);
      } else {
        newFish.set(6, population);
      }
      newFish.set(8, population);
    } else {
      if (newFish.has(fish - 1)) {
        newFish.set(fish - 1, newFish.get(fish - 1) + population);
      } else {
        newFish.set(fish - 1, population);
      }
    }
  }

  return newFish;
};

const partTwo = () => {
  const lines = getLines();
  let lanternFish = frequency(lines[0].split(',').map(f => parseInt(f)));

  for (let i = 0; i < 256; i++) {
    lanternFish = nextDay(lanternFish);
  }

  let lanternFishCount = 0;
  for (const [k, v] of lanternFish) {
    lanternFishCount += v;
  }

  console.log('lantern fish population:', lanternFishCount);
 };

partTwo();