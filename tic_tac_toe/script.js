const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');

let currentPlayer = 'X';
let board = Array(9).fill(null);

// Function to handle cell clicks
function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (!board[index]) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
      message.textContent = `Player ${currentPlayer} Wins!`;
      cells.forEach(cell => cell.classList.add('taken'));
      return;
    } else if (board.every(cell => cell)) {
      message.textContent = 'It\'s a Tie!';
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Function to reset the game
function resetGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  message.textContent = '';
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
