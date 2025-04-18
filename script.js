console.log('Hello');

function Player(name, marker) {
  return { name, marker };
}

const Board = (() => {
  const emptyBoard = ['', '', '', '', '', '', '', '', ''];

  let board = [...emptyBoard];

  const getBoard = () => board;

  const getIndexesOfPlayerPoints = (player) => {
    const indexes = [];

    board.forEach((cell, index) => {
      if(cell === player.marker) {
        indexes.push(index);
      }
    });

    return indexes;
  }

  const setPoint = (player, index) => {
    board[index] = player.marker;
  }

  const clearBoard = () => board = [...emptyBoard];

  return {
    getBoard,
    setPoint,
    clearBoard,
    getIndexesOfPlayerPoints,
  }
})();

const GameController = (() => {
  const player1 = Player('Player 1', 'O');
  const player2 = Player('Player 2', 'X');

  let currentPlayer = player1;

  const winPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const isPlayerWin = (player) => {
    const indexes = Board.getIndexesOfPlayerPoints(player);

    if(indexes > 3) return false;

    return winPositions.some(winPosition => winPosition.every((wp, i) => wp === indexes[i]))
  }

  const playMove = (index) => {
    Board.setPoint(currentPlayer, index);
    console.log(Board.getBoard());

    if(isPlayerWin(currentPlayer)) {
      console.log(`${currentPlayer.name} is ${isPlayerWin(currentPlayer) ? 'win' : 'not win'}`);
      return;
    } 
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

const UI = ((doc) => {
  let boardNode = doc.querySelector('.board');
  let clickCellHandler;

  // let setClickCellHandler = ()

  const renderBoard = (board) => {
    console.log('board')
    board.forEach((cell) => {
      let cellNode = doc.createElement('div');
      cellNode.textContent = cell;
      boardNode.appendChild(cellNode);
      // if(cell === '') cellNode.addEventListener('click', )
    });
  }

  return {
    renderBoard,
  }

})(document);

UI.renderBoard(Board.getBoard());

// Player 1
// GameController.playMove(2);
// // Player 2
// GameController.playMove(3);
// // Player 1
// GameController.playMove(4);
// // Player 2
// GameController.playMove(0);
// // Player 1
// GameController.playMove(8);
// // Player 2
// GameController.playMove(6);


