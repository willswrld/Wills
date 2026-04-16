const cells = Array.from(document.querySelectorAll('.cell'));
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

const getWinner = () => {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes('') ? null : 'draw';
};

const updateStatus = (winner) => {
  if (winner === 'draw') {
    statusText.textContent = "It's a draw!";
  } else if (winner) {
    statusText.textContent = `Player ${winner} wins!`;
  } else {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const handleCellClick = (event) => {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (gameOver || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.disabled = true;

  const winner = getWinner();
  if (winner) {
    gameOver = true;
    cells.forEach((c) => {
      c.disabled = true;
    });
    updateStatus(winner);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
};

const resetGame = () => {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
  });

  updateStatus();
};

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
