console.log('Hello');

function Player(name, marker) {
  return { name, marker };
}

const Board = (() => {
  const emptyBoard = ['', '', '', '', '', '', '', '', ''];

  let board = [...emptyBoard];

  const getBoard = () => board;

  const setPoint = (user, index) => {
    board[index] = user.marker;
  }

  const clearBoard = () => board = [...emptyBoard];

  return {
    getBoard,
    setPoint,
    clearBoard,
  }
})();

const GameController = (() => {
  const player1 = Player('Player 1', 'O');
  const player2 = Player('Player 2', 'X');

  let currentPlayer = player1;

  const playMove = (index) => {
    Board.setPoint(currentPlayer, index);
    console.log(Board.getBoard());

    // check winner
    
    // else check draw
    
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const restartGame = () => {
    currentPlayer = player1;
    Board.clearBoard();
  }

  return {
    playMove,
    restartGame,
  }
})();

// Player 1
GameController.playMove(0);
// Player 2
GameController.playMove(3);
// Player 1
GameController.playMove(1);
// Player 2
GameController.playMove(4);
// Player 1
GameController.playMove(2);


