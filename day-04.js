#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => {
  return fs.readFileSync('./input-04.txt', 'utf8').trim().split('\n');
}

const readCalledNumbers = (lines) => {
  const line = lines.shift();

  return line.split(',').map(i => parseInt(i));
};

const readBoard = (lines) => {
  const board = [];
  for (let i = 0; i < 5; i++) {
    const line = lines.shift();
    board.push(line.trim().split(/\s+/).map(i => ({ num: parseInt(i), called: false })));
  }
  return board;
};

const callNumber = (calledNumber, boards) => {
  for (const board of boards) {
    for (const rows of board) {
      for (const cell of rows) {
        if (cell.num === calledNumber) {
          cell.called = true;
        }
      }
    }
  }
}

const sumUnmarkedNumbers = (board) => {
  let score = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (!board[row][col].called) {
        score += board[row][col].num;
      }
    }
  }

  return score;
}

const checkBoardForWinner = (board) => {
  if (board.some(row => row.every(cell => cell.called))) {
    return true;
  }

  for (let col = 0; col < board[0].length; col++) {
    let foundColWinner = true;
    for (let row = 0; row < board.length; row++) {
      if (!board[row][col].called) {
        foundColWinner = false;
        break;
      }
    }
    if (foundColWinner) {
      return true;
    }
  }
}

const partOne = () => {
  let lines = getLines();

  const calledNumbers = readCalledNumbers(lines);
  lines.shift();

  const boards = [];
  while (lines.length !== 0) {
    boards.push(readBoard(lines));
    lines.shift();
  }

  let winnerBoard, lastCalledNumber;
  for (const calledNumber of calledNumbers) {
    callNumber(calledNumber, boards);
    for (const board of boards) {
      const foundWinner = checkBoardForWinner(board);
      if (foundWinner) {
        winnerBoard = board;
        lastCalledNumber = calledNumber;
        break;
      }
    }
    if (winnerBoard) {
      break;
    }
  }

  if (!winnerBoard) {
    console.error('no winner found');
  }

  const score = sumUnmarkedNumbers(winnerBoard);
  console.log(`${score} * ${lastCalledNumber} = ${score * lastCalledNumber}`);
}

// partOne();

const partTwo = () => {
  let lines = getLines();

  const calledNumbers = readCalledNumbers(lines);
  lines.shift();

  let boards = [];
  while (lines.length !== 0) {
    boards.push(readBoard(lines));
    lines.shift();
  }

  let lastWinnerBoard, lastCalledNumber;
  for (const calledNumber of calledNumbers) {
    callNumber(calledNumber, boards);

    let remainingBoards = [];
    for (const board of boards) {
      const foundWinner = checkBoardForWinner(board);
      if (foundWinner) {
        lastWinnerBoard = board;
        lastCalledNumber = calledNumber;
      } else {
        remainingBoards.push(board);
      }
    }
    boards = remainingBoards;
    if (boards.length === 0) {
      break;
    }
  }

  if (!lastWinnerBoard) {
    console.error('no winner found');
    return;
  }

  const score = sumUnmarkedNumbers(lastWinnerBoard);
  console.log(`${score} * ${lastCalledNumber} = ${score * lastCalledNumber}`);
}

partTwo();
