function Player(name, marker) {
  return { 
    name, 
    marker,
  };
}

const Board = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

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

  const isEmptyCellsExist = () => board.some(cell => cell === '');

  const isCellEmpty = (index) => {
    return board[index] === '' ? true : false;
  }

  const setPoint = (player, index) => {
    board[index] = player.marker;
  }

  return {
    getBoard,
    setPoint,
    isCellEmpty,
    isEmptyCellsExist,
    getIndexesOfPlayerPoints,
  }
})();

const UI = (() => {
  let boardNode = document.querySelector('.board');
  const resultNode = document.querySelector('.result');
  let currentPlayerNode = document.querySelector('.current-player');

  const renderBoard = (board, cellClickHandler) => {
    while(boardNode.firstChild) {
      boardNode.removeChild(boardNode.lastChild);
    }

    board.forEach((cell, index) => {
      let cellNode = document.createElement('div');
      cellNode.textContent = cell;
      if(cell === '') cellNode.classList.add('free');
      cellNode.addEventListener('click', () => cellClickHandler(index));
      boardNode.appendChild(cellNode);
    });
  }

  const setCellClickHandler = (fn) => {
    let cellNodes = document.querySelectorAll('.board > div');
    cellNodes.forEach((cellNode, index) => {
      cellNode.addEventListener('click', () => fn(index))
    })
  }

  const renderCurrentPlayer = (player) => {
    currentPlayerNode.textContent = `${player.name} - ${player.marker}`;
  }

  const renderResult = (text) => {
    resultNode.textContent = text;
  }

  return {
    renderBoard,
    renderResult,
    renderCurrentPlayer,
    setCellClickHandler,
  }
})(document);

const GameController = (() => {
  let isGameOver = false;
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');

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

  function playMove(index) {
    if(isGameOver) return;
    if(!Board.isCellEmpty(index)) return;

    Board.setPoint(currentPlayer, index);
    UI.renderBoard(Board.getBoard(), playMove);

    if(isPlayerWin(currentPlayer)) {
      UI.renderResult(`${currentPlayer.name} is win`);
      isGameOver = true;
    } else if(!Board.isEmptyCellsExist()) {
      UI.renderResult('It\'s a draw.');
      isGameOver = true;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  }

  const start = () => {
    UI.renderBoard(Board.getBoard(), playMove);
  }

  return {
    start,
    playMove,
  }
})();

GameController.start();