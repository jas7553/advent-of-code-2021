#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-11-sample.txt', 'utf8').trim().split('\n');

const printBoard = (board) => {
  console.log(board.map(row => row.join('')).join('\n'));
  console.log();
}

const nextStep = (board) => {
  const nextBoard = Array(10);
  for (let row = 0; row < board.length; row++) {
    nextBoard[row] = Array(10);
    for (let col = 0; col < board[row].length; col++) {
      nextBoard[row][col] = board[row][col] + 1;
    }
  }

  return nextBoard;
}

const partOne = () => {
  const lines = getLines();

  let board = lines.map(line => line.split('').map(cell => parseInt(cell)));
  console.log('Before any steps:')
  printBoard(board);

  for (let i = 1; i < 3; i++) {
    board = nextStep(board);
    console.log(`After step ${i}:`);
    printBoard(board);
  }
};

partOne();