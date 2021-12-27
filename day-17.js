#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-17.txt', 'utf8').trim().split('\n');

const parseRange = (range) => range.substring(2, range.length).split('..').map(x => parseInt(x));

const parseLines = (lines) => {
  const [xRange, yRange] = lines[0].substring('target area: '.length, lines[0].length).split(', ');
  const [xStart, xEnd] = parseRange(xRange);
  const [yStart, yEnd] = parseRange(yRange);
  return {
    xStart,
    xEnd,
    yStart,
    yEnd,
  }
};

const step = (probe) => {
  return {
    x: probe.x + probe.xVelocity,
    y: probe.y + probe.yVelocity,
    xVelocity: probe.xVelocity === 0 ? probe.xVelocity : (probe.xVelocity > 0 ? probe.xVelocity - 1 : probe.xVelocity + 1),
    yVelocity: probe.yVelocity - 1,
  };
};

const isInTarget = (probe, target) => {
  return (probe.x >= target.xStart) && (probe.x <= target.xEnd) && (probe.y >= target.yStart) && (probe.y <= target.yEnd);
};

const probeWillHitTarget = (probe, target) => {
  let highestY = 0;
  for (let i = 0; i < 5_000; i++) {
    probe = step(probe);
    const hasHitTarget = isInTarget(probe, target);
    highestY = Math.max(probe.y, highestY);
    if (hasHitTarget) {
      return {
        willHit: true,
        highestY,
      }
    }
  }

  return {
    willHit: false,
  }
}

const partOne = () => {
  const lines = getLines();
  const target = parseLines(lines);

  let winX, winY, highestY = 0;
  for (let x = 0; x < 1_000; x++) {
    for (let y = 0; y < 1_000; y++) {
      const probe = {
        x: 0,
        y: 0,
        xVelocity: x,
        yVelocity: y,
      };
      const shot = probeWillHitTarget(probe, target);
      if (shot.willHit && shot.highestY > highestY) {
        highestY = shot.highestY;
        winX = x;
        winY = y;
      }
    }
  }

  console.log(highestY, `${winX},${winY}`);
};

// partOne();

const partTwo = () => {
  const lines = getLines();
  const target = parseLines(lines);

  let count = 0;
  for (let x = 0; x < 500; x++) {
    for (let y = -100; y < 100; y++) {
      const probe = {
        x: 0,
        y: 0,
        xVelocity: x,
        yVelocity: y,
      };
      const shot = probeWillHitTarget(probe, target);
      if (shot.willHit) {
        count++;
      }
    }
  }

  console.log(count);
};

partTwo();
