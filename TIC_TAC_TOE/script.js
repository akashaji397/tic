const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      return cells[a].textContent;
    }
  }
  return null;
}

function handleCellClick(cell) {
  const index = Array.from(cells).indexOf(cell);

  if (cell.textContent || !gameActive) {
    return;
  }

  cell.textContent = currentPlayer;
  const winner = checkWinner();

  if (winner) {
    winnerMessage.textContent = `${winner} wins!`;
    gameActive = false;
  } else if (Array.from(cells).every((cell) => cell.textContent)) {
    winnerMessage.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  winnerMessage.textContent = '';
  currentPlayer = 'X';
  gameActive = true;
}

cells.forEach((cell) => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

restartButton.addEventListener('click', restartGame);
