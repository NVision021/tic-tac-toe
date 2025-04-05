function createPlayer (name, token, goesFirst) {
  const getName = () => {
    return name;
  }

  const getToken = () => {
    return token;
  }

  const getGoesFirst = () => {
    return goesFirst;
  }

  return {getName, getToken, getGoesFirst}
}


const gameboard = (function() {

  let board = ['', '', '', '', '', '', '', '', ''];

  const clearBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  }

  const getBoard = () => {
    return board;
  }

  const addToken = (position, token) => {
    if (board[position] === '') {
      board[position] = token;
    }
  }

  const getCounters = () => {
    let turns = 0;
    for (let square of board) {
      if (square !== '') {
        turns++;
      }
    }
    return turns;
  }

  return {getBoard, addToken, getCounters, clearBoard}
})();


const gameHandler = (function() {
  let player1 = {};
  let player2 = {};

  const startGame = (player1Data, player2Data) => {
    player1 = createPlayer(...player1Data);
    console.log(gameHandler.player1);
    player2 = createPlayer(...player2Data);
    gameboard.clearBoard();
  }

  const getPlayers = () => {
    return {player1, player2};
  }

  const getWhoseTurn = () => {
    //First check who should go first based on number with ternary operator and destructuring
    let [firstPlayer, secondPlayer] = player1.getGoesFirst() 
    ? [player1, player2] 
    : [player2, player1];


    if (gameboard.getCounters() % 2 === 0) {
      return firstPlayer;
    } else {
      return secondPlayer;
    }
  }

  /*
  const changeTurn = (currentTurn)

  const checkWin = () 

  const takeTurn


*/

  return{getPlayers, startGame, getWhoseTurn};
})();

gameHandler.startGame(['Nick', 'x', true], ['Grace', 'o', false]);
console.log(gameHandler.getPlayers());
console.log(gameHandler.getWhoseTurn().getName());