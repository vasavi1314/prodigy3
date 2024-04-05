const board = document.querySelector('.board');
const status = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  return null;
}

function checkDraw() {
  return !gameBoard.includes('');
}

function handleClick(event) {
  const index = event.target.getAttribute('data-index');
  if (gameBoard[index] || gameEnded) {
    return;
  }

  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winner = checkWin();
  if (winner) {
    status.textContent = `Player ${winner} wins!`;
    gameEnded = true;
  } else if (checkDraw()) {
    status.textContent = "It's a draw!";
    gameEnded = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameEnded = false;
  status.textContent = `Player X's turn`;
  document.querySelectorAll('.square').forEach(square => {
    square.textContent = '';
  });
}

board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetGame);
