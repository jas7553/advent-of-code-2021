#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-13.txt', 'utf8').trim().split('\n');

const parseLines = (lines) => {
  const folds = []
  const coordinates = [];
  for (const line of lines) {
    if (line.startsWith('f')) {
      const [foldAlong, value] = line.split('=');
      folds.push({
        foldAlong: foldAlong[foldAlong.length - 1],
        value: parseInt(value),
      })
    } else if (line.trim() !== '') {
      const [x, y] = line.split(',');
      coordinates.push({
        x: parseInt(x),
        y: parseInt(y),
      });
    }
  }

  return {
    paper: {
      width: Math.max(...coordinates.map(coordinate => coordinate.x)),
      height: Math.max(...coordinates.map(coordinate => coordinate.y)),
      coordinates,
    },
    folds,
  };
}

const foldPaper = (paper, fold) => {
  const horizontalFold = fold.foldAlong === 'y';
  let newCoordinates;
  if (horizontalFold) {
    newCoordinates = paper.coordinates.map(coordinate => {
      if (coordinate.y > fold.value) {
        return {
          x: coordinate.x,
          y: fold.value - (coordinate.y - fold.value),
        }
      } else {
        return coordinate;
      }
    });
  } else {
    newCoordinates = paper.coordinates.map(coordinate => {
      if (coordinate.x > fold.value) {
        return {
          x: fold.value - (coordinate.x - fold.value),
          y: coordinate.y,
        }
      } else {
        return coordinate;
      }
    });
  }

  return {
    coordinates: newCoordinates,
    width: horizontalFold ? paper.width : paper.width / 2 - 1,
    height: horizontalFold ? paper.height / 2 - 1 : paper.height,
  };
}

const printPaper = (paper) => {
  const grid = Array(paper.height + 1).fill().map(() => Array(paper.width + 1).fill('.'));

  for (const coordinate of paper.coordinates) {
    grid[coordinate.y][coordinate.x] = '#';
  }

  for (let row = 0; row < grid.length; row++) {
    let line = '';
    for (let col = 0; col < grid[row].length; col++) {
      line += grid[row][col];
    }
    console.log(line);
  }
}

const countHolesInPaper = (paper) => {
  const s = new Set();
  for (const coordinate of paper.coordinates) {
    s.add(`${coordinate.x},${coordinate.y}`);
  }
  return s.size;
};

const partOne = () => {
  const lines = getLines();
  let { paper, folds } = parseLines(lines);

  console.log(countHolesInPaper(foldPaper(paper, folds[0])));
};

partOne();

const partTwo = () => {
  const lines = getLines();
  let { paper, folds } = parseLines(lines);

  for (const fold of folds) {
    paper = foldPaper(paper, fold);
  }
  printPaper(paper);
};

partTwo();
