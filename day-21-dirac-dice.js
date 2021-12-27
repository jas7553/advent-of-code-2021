#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-21.txt', 'utf8').trim().split('\n');

const parseLines = (lines) => {
  return lines.map(line => {
    const parts = line.split(' ');
    return {
      player: parseInt(parts[1]),
      position: parseInt(parts[parts.length - 1]),
      score: 0,
    }
  });
};

const rollDie = (die, times) => {
  let total = 0;
  for (let i = 0; i < times; i++) {
    die = (die % 100) + 1;
    total += die;
  }

  return {
    total,
    die,
  };
}

const roll = ({ player, position, score }, die) => {
  const dieRoll = rollDie(die, 3);
  const newPosition = ((position + dieRoll.total - 1) % 10) + 1;
  const newScore = score + newPosition;
  console.log(`Player ${player} rolls ${((die) % 100) + 1}+${((die + 1) % 100) + 1}+${((die + 2) % 100) + 1} and moves to space ${newPosition} for a total score of ${newScore}.`);
  return {
    die: dieRoll.die,
    player: {
      player,
      position: newPosition,
      score: newScore,
    },
  };
}

const partOne = () => {
  const lines = getLines();
  const gameState = parseLines(lines);

  let die = 100;
  let rolls = 0;
  let highestScore = 0;
  while (highestScore < 1000) {
    const result = roll(gameState[rolls % 2], die);
    gameState[rolls % 2] = result.player;
    die = result.die;
    highestScore = Math.max(highestScore, gameState[rolls % 2].score);
    rolls++;
  }

  console.log('Total rolls:', rolls * 3);
  console.log('Game state:', gameState);
};

partOne();
