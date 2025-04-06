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
    gameHandler.takeTurn();
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


  const checkWin = (turnPlayer) => {
// returns true when the game is over

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

    let playerName = turnPlayer.getName();
    let playerToken = turnPlayer.getToken();
    let tokenPositions = [];
    let count = 0;

    for (let placedToken of gameboard.getBoard()) {
      if (placedToken === playerToken){
        tokenPositions.push(count);
      }
      count++;
    }
    
    for (let combination of winningCombinations) {
      if (combination.every((value) => tokenPositions.includes(value))) {
        console.log(`${playerName} wins!!`);
        return true;
      } else if (gameboard.getCounters() >= 9) {
        console.log("It's a draw!!");
        return true;
      }
    }
    return false;
  }

  const takeTurn = () => {
    let whoseTurn = gameHandler.getWhoseTurn();
    console.log(`It's ${whoseTurn.getName()}'s turn`)
    //^remove in final product
    console.log(`What position would you like to put your token in?`)
    //^remove in final product
    let tokenPosition = prompt('Where should the token go (0-8)?')
    //^remove in final product
    gameboard.addToken(tokenPosition, whoseTurn.getToken());
    console.log(gameboard.getBoard());
    //^remove in final product
    if (gameHandler.checkWin(whoseTurn) !== true) {
      gameHandler.takeTurn();
    }

  }
  
  return{getPlayers, startGame, getWhoseTurn, checkWin, takeTurn};
})();

//gameHandler.startGame(['Nick', 'x', false], ['Grace', 'o', true]);