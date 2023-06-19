// Game logic
let currentPlayer = "X"; // Player X starts the game
const cells = document.querySelectorAll(".cell");
const turnElement = document.querySelector("#turn p");

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {
  const cell = e.target;
  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    if (checkWin()) {
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
    } else if (checkDraw()) {
      alert("It's a draw!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateTurnText();
    }
  }
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      return true; // Player wins
    }
  }

  return false; // No win
}

function checkDraw() {
  let isDraw = true;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      isDraw = false; // Game is not a draw
      break;
    }
  }
  return isDraw; // Return true if game is a draw
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = ""; // Clear the cell content
    cell.classList.remove("X", "O"); // Remove the X and O classes
  });
  currentPlayer = "X"; // Reset to player X
  updateTurnText();
}

function updateTurnText() {
  turnElement.textContent = `Player ${currentPlayer}'s Turn`;
}
