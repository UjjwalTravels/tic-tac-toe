document.addEventListener('DOMContentLoaded', () => {
  const statusDisplay = document.getElementById('status');
  const cells = document.querySelectorAll('.cell');
  const restartButton = document.getElementById('restart-button');
  const xScoreDisplay = document.getElementById('x-score');
  const oScoreDisplay = document.getElementById('o-score');
  
  let gameActive = true;
  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let scores = { X: 0, O: 0 };
  
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  const winningMessage = () => `Player ${currentPlayer} wins!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;
  
  statusDisplay.textContent = currentPlayerTurn();
  
  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
      return;
    }
    
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }
  
  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    
    // Add animation
    clickedCell.style.transform = 'scale(0)';
    setTimeout(() => {
      clickedCell.style.transform = 'scale(1)';
    }, 100);
  }
  
  function handleResultValidation() {
    let roundWon = false;
    let winningLine = null;
    
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
      
      if (condition) {
        roundWon = true;
        winningLine = winningConditions[i];
        break;
      }
    }
    
    if (roundWon) {
      statusDisplay.textContent = winningMessage();
      gameActive = false;
      
      // Highlight winning cells
      winningLine.forEach(index => {
        cells[index].classList.add('win');
      });
      
      // Update score
      scores[currentPlayer]++;
      updateScoreDisplay();
      
      return;
    }
    
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
      statusDisplay.textContent = drawMessage();
      gameActive = false;
      return;
    }
    
    changePlayer();
  }
  
  function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = currentPlayerTurn();
  }
  
  function updateScoreDisplay() {
    xScoreDisplay.textContent = scores.X;
    oScoreDisplay.textContent = scores.O;
  }
  
  function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = currentPlayerTurn();
    
    cells.forEach(cell => {
      cell.classList.remove('x', 'o', 'win');
      cell.style.transform = '';
    });
  }
  
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  
  restartButton.addEventListener('click', handleRestartGame);
});