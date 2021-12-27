#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-07.txt', 'utf8').trim().split('\n');

const partOne = () => {
  const lines = getLines();
  const crabs = lines[0].split(',').map(c => parseInt(c));
  const { min, max } = crabs.reduce((prev, crab) => {
    return {
      min: Math.min(prev.min, crab),
      max: Math.max(prev.max, crab)
    };
  }, { min: 0, max: 0 });

  let smallest = Number.MAX_VALUE;
  for (let position = min; position <= max; position++) {
    const fuelCosts = crabs.map(crab => Math.abs(crab - position));
    const fuel = fuelCosts.reduce((acc, fuel) => acc + fuel, 0);
    smallest = Math.min(smallest, fuel);
  }

  console.log('cheapest fuel cost', smallest);
};

// partOne();

const partTwo = () => {
  const lines = getLines();
  const crabs = lines[0].split(',').map(c => parseInt(c));
  const { min, max } = crabs.reduce((prev, crab) => {
    return {
      min: Math.min(prev.min, crab),
      max: Math.max(prev.max, crab)
    };
  }, { min: 0, max: 0 });

  let smallest = Number.MAX_VALUE;
  for (let position = min; position <= max; position++) {
    const fuelCosts = crabs.map(crab => {
      const distance = Math.abs(crab - position);
      return distance * (distance + 1) / 2;
    });
    const fuel = fuelCosts.reduce((acc, fuel) => acc + fuel, 0);
    smallest = Math.min(smallest, fuel);
  }

  console.log('cheapest fuel cost', smallest);
};

partTwo();
