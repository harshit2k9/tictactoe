let currentPlayer = 'X';
let gameBoard = Array(9).fill('');

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]            // Diagonals
];

function displayResult(message) {
  const resultScreen = document.querySelector('.result-screen');
  const resultContent = document.querySelector('.result-content');
  const resultMessage = document.querySelector('.result-message');

  resultMessage.textContent = message;
  resultScreen.style.display = 'flex';
}

function makeMove(cell) {
  const index = Array.from(cell.parentNode.children).indexOf(cell);
  if (gameBoard[index] === '' && !isGameOver()) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (isGameOver()) {
      const message = gameBoard.includes('') ? `Player ${currentPlayer} wins!` : "It's a draw!";
      displayResult(message);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function isGameOver() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = Array(9).fill('');
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.textContent = '');
  document.getElementById('status').textContent = "Player 1's turn (X)";
  document.querySelector('.result-screen').style.display = 'none';
}
