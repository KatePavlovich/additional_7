module.exports = function solveSudoku(matrix) {
  // your solution
  let emptyPositions = saveEmptyPositions(matrix);
  return findSolution(matrix, emptyPositions);
}

function saveEmptyPositions(matrix) {
  let emptyPositions = [];
  let len = matrix.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (matrix[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }
  return emptyPositions;
}


function checkRow(board, row, value) {
  for (let i = 0, len = board[row].length; i < len; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }
  return true;
}

function checkColumn(board, column, value) {
  for (let i = 0, len = board.length; i < len; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }
  return true;
}

function check3x3Section(board, column, row, value) {
  let columnCorner = 0;
  let rowCorner = 0;
  let squareSize = 3;

  while (column >= columnCorner + squareSize) {
    columnCorner += squareSize
  }

  while (row >= rowCorner + squareSize) {
    rowCorner += squareSize
  }

  for (let i = rowCorner; i < rowCorner + squareSize; i++) {
    for (let j = columnCorner; j < columnCorner + squareSize; j++) {
      if (board[i][j] === value) {
        return false;
      }
    }
  }
  return true;
}

function checkValue(board, column, row, value) {
  return (checkRow(board, row, value) && checkColumn(board, column, value) && check3x3Section(board, column, row, value))
}

function findSolution(board, emptyPositions) {
  let limit = board.length;
  let row;
  let column;
  let value;
  let found;
  let i;

  for (i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];
    value = board[row][column] + 1;
    found = false;

    while (!found && value <= limit) {
      if (checkValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
      } else {
        value++;
      }
    }
    if (!found) {
      board[row][column] = 0;
      i--;
    }
  }
  return board;
}