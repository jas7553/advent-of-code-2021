#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-05.txt', 'utf8').trim().split('\n');

const parseLines = (lines) => {
  return lines.map(line => {
    const [start, end] = line.trim().split(' -> ');
    const [x1, y1] = start.split(',');
    const [x2, y2] = end.split(',');
    return {
      start: {
        col: parseInt(x1),
        row: parseInt(y1),
      },
      end: {
        col: parseInt(x2),
        row: parseInt(y2),
      },
    }
  });
}

const getOceanFloor = (oceanLines) => {
  const [colCount, rowCount] = oceanLines.reduce((prev, cur) => {
    return [Math.max(prev[0], cur.start.col, cur.end.col), Math.max(prev[1], cur.start.row, cur.end.row)];
  }, [0, 0]);

  const oceanFloor = Array(rowCount + 1).fill().map(() => Array(colCount + 1).fill(0));

  for (const { start, end } of oceanLines) {
    if (start.row === end.row && start.col > end.col) {
      // right to left
      for (let col = end.col; col <= start.col; col++) {
        oceanFloor[start.row][col]++;
      }
    } else if (start.row === end.row && start.col < end.col) {
      // left to right
      for (let col = start.col; col <= end.col; col++) {
        oceanFloor[start.row][col]++;
      }
    } else if (start.col === end.col && start.row > end.row) {
      // down to up
      for (let row = end.row; row <= start.row; row++) {
        oceanFloor[row][start.col]++;
      }
    } else if (start.col === end.col && start.row < end.row) {
      // up to down
      for (let row = start.row; row <= end.row; row++) {
        oceanFloor[row][start.col]++;
      }
    } else if (start.row > end.row && start.col > end.col) {
      // right to left, down to up
      for (let row = start.row, col = start.col; row >= end.row; row-- && col--) {
        oceanFloor[row][col]++;
      }
    } else if (start.row > end.row && start.col < end.col) {
      // left to right, down to up
      for (let row = start.row, col = start.col; row >= end.row; row-- && col++) {
        oceanFloor[row][col]++;
      }
    } else if (start.row < end.row && start.col > end.col) {
      // right to left, up to down
      for (let row = start.row, col = start.col; row <= end.row; row++ && col--) {
        oceanFloor[row][col]++;
      }
    } else if (start.row < end.row && start.col < end.col) {
      // left to right, up to down
      for (let row = start.row, col = start.col; row <= end.row; row++ && col++) {
        oceanFloor[row][col]++;
      }
    } else {
      throw new Error('unexpected:', start, end);
    }
  }

  return oceanFloor;
};

const countDangerAreas = (oceanFloor) => {
  return oceanFloor.reduce((total, oceanLine) => {
    return total + oceanLine.reduce((subTotal, oceanTile) => {
      return oceanTile > 1 ? subTotal + 1 : subTotal;
    }, 0);
  }, 0);
};

const partOne = () => {
  const oceanLines = parseLines(getLines());
  const oceanFloor = getOceanFloor(oceanLines.filter(oceanLine => {
    return oceanLine.start.col === oceanLine.end.col || oceanLine.start.row === oceanLine.end.row
  }));

  console.log('dangerAreaCount:', countDangerAreas(oceanFloor));
};

partOne();

const partTwo = () => {
  const oceanLines = parseLines(getLines());
  const oceanFloor = getOceanFloor(oceanLines);

  console.log('dangerAreaCount:', countDangerAreas(oceanFloor));
};

partTwo();
