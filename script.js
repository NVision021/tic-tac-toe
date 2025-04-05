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
  let playerOne = {};
  let playerTwo = {};

  const startGame = (playerOneData, playerTwoData) => {
    playerOne = createPlayer(...playerOneData);
    playerTwo = createPlayer(...playerTwoData);
    gameboard.clearBoard();
  }

  const getPlayers = () => {
    return {playerOne, playerTwo};
  }

  const getWhoseTurn = () => {
    //First check who should go first based on number with ternary operator and destructuring
    let [firstPlayer, secondPlayer] = playerOne.getGoesFirst() 
    ? [playerOne, playerTwo] 
    : [playerTwo, playerOne];


    if (gameboard.getCounters() % 2 === 0) {
      return firstPlayer;
    } else {
      return secondPlayer;
    }
  }

  const checkWin = () => {
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5], 
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let playerKey in gameHandler.getPlayers()) {
      player = gameHandler.getPlayers()[playerKey];
      let tokenPositions = [];
      let count = 0;
      for (let placedToken of gameboard.getBoard()) {
        if (placedToken === player.getToken()){
          tokenPositions.push(count);
          count++;
        }
      }
      
      for (let combination of winningCombinations) {
        if (combination.every((value) => tokenPositions.includes(value))) {
          console.log(`${player.getName()} wins!!`);
          break;
        }
      }
    }
  }
  /*
  
  const takeTurn (should call a series of other functions from this function factory, may just be for playing in the console


*/

  return{getPlayers, startGame, getWhoseTurn, checkWin};
})();

gameHandler.startGame(['Nick', 'x', true], ['Grace', 'o', false]);
gameboard.addToken(0, 'x');
gameboard.addToken(1, 'x');
gameboard.addToken(2, 'x');
gameHandler.checkWin();