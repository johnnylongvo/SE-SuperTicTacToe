import React, { useContext, useEffect, useState } from "react";
import gameContext from "../../Context/gameContext";
import gameActionService from "../../services/gameActionService";
import socketService from "../../services/socketService"; 
import Timer from "../Timer/Timer"; 
import _ from "lodash";
// export type IPlayMatrix = Array<Array<string | null>>;
// export interface IStartGame {
//   start: boolean;
//   symbol: "x" | "o";
// }

export function Game(props) {
  const [mark, setMark] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isComputer, setIsComputer] = useState(false);

  const humanPlayer = "x";
  const AIPlayer = "o";

  const [matrix, setMatrix] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  const [result, setResult] = useState("");

  const grid = (Array(25).fill(null));

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
  } = useContext(gameContext);

  const checkGameState = (matrix) => {
    console.log("isPlayerTurn => ", isPlayerTurn);
    console.log("playerSymbol => ", playerSymbol);
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (row.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (column.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
    let t = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        grid[t++] = matrix[i][j];
      }
    }
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (grid[a] &&
        grid[a] === grid[b]
        && grid[a] === grid[c]
        && grid[a] === grid[d]
        && grid[a] === grid[e]) {
        if (grid[a] === playerSymbol) return [true, false];
        else return [false, true];
      }
    }

    if (matrix.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  };
  
  const computerMove = (symbol) => {
    const newMatrix = _.cloneDeep(matrix);
    let bestScore = -Infinity;
    let move;
    let col = 0,
      row = 0,
      found = false;

    //check x player is winning or not
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        // Is the spot available?
        if (newMatrix[i][j] == null) {
          newMatrix[i][j] = humanPlayer;

          let result = props.checkWinner(newMatrix, humanPlayer);
          newMatrix[i][j] = null;
          //first case user select any box except middle
          if (newMatrix[2][2] === null) {
            move = { i: 2, j: 2 };
            found = true;
          } else if (result.winner === humanPlayer && (result.row !== undefined && result.column !== undefined)) {
            //winning conidtion for  'x'
            move = { i:result.row , j: result.column };
            found = true;
            break;
          } else if((result.winner === 'd1' || result.winner === 'd2') && (result.row !== undefined && result.column !== undefined)){
            
            move = { i: result.row, j: result.column };
            found = true;
            break;
            
          } else          
          if (!found && newMatrix[i][j] === null) {
            move = { i, j };
            found = true;
            break;
          }
        }
      }

      if (found) break;
    }

    //check best positon of 'o'
    let resultOPlayer = props.checkWinner(newMatrix, AIPlayer);

    if (
      !found &&
      resultOPlayer.row !== null &&
      resultOPlayer.column !== null &&
      resultOPlayer.row !== undefined &&
      resultOPlayer.column !== undefined
    ) {
      move = { i:resultOPlayer.row , j: resultOPlayer.column };
    }

    let column;
    let isFound = false;
    var count = 0;
    
    while(!isFound){
      let rowIndex = getRndInteger(0, 4);
      let columnIndex = getRndInteger(0, 4);
      count++;

      if(newMatrix[rowIndex][columnIndex] === null){
        isFound = true;
        move.i = rowIndex;
        move.j = columnIndex;
      }
      if(count > 10000){
        isFound = true;
      }
    }

    if(count>10000){
    for(let i = 0 ; i < 5; i++){
      for(let j=0; j< 5;j++)
      {
        if(matrix[i][j]===null){
          move.i=i;
          move.j = j;
          console.log(i, j);
        }
      }
    }
  }
    
    //let aiBlock = minimax(newMatrix, 0, false);

    //matrix[move.i][move.j] = AIPlayer;
    //setMatrix(matrix);
    // sleep(5000);
    if(move !== undefined){
      updateGameMatrix(move.j, move.i, symbol);
    }
    //setPlayerMove(false);
    setPlayerTurn(true);
  };

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  const updateGameMatrix = (column, row, symbol) => {
    const newMatrix = [...matrix];

    if (newMatrix[row][column] === null || newMatrix[row][column] === "null") {
      newMatrix[row][column] = symbol;
      setMatrix(newMatrix);
    }

    if (socketService.socket) {
      gameActionService.refresh(socketService.socket, newMatrix);
      const [currentPlayerWon, otherPlayerWon]= checkGameState(newMatrix);
      if (currentPlayerWon && otherPlayerWon) {
        gameActionService.win(socketService.socket, "The Game is a TIE!");
        // alert("The Game is a TIE!");
        setResult("Game Draw");
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameActionService.win(socketService.socket, "You Lost!");
        // alert("You Won!");
        setResult("You Won!");
      }

      //setPlayerTurn(false);
    }
    console.log("isPlayerTurn => ", isPlayerTurn);
    console.log("playerSymbol => ", playerSymbol);
  };

  const handleGameUpdate = () => {
    if (socketService.socket)
      gameActionService.onRefresh(socketService.socket, (newMatrix) => {
        console.log("update => ", newMatrix);
        setMatrix(newMatrix);
        checkGameState(newMatrix);
        //setPlayerTurn(true);
        console.log("isPlayerTurn => ", isPlayerTurn);
        console.log("playerSymbol => ", playerSymbol);
        //if (isPlayerTurn)
        //computerMove();
      });
  };

  const handleGameStart = () => {
    if (socketService.socket)
      gameActionService.onStart(socketService.socket, (options) => {
        console.log("start => ", options);
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        // if (options.start) setPlayerTurn(true);
        // else setPlayerTurn(false);

      });
  };

  const handleGameWin = () => {
    if (socketService.socket)
      gameActionService.onWin(socketService.socket, (message) => {
        console.log("win=> ", message);
        setPlayerTurn(false);
        // alert(message);
        setResult(message);
      });
  };

  const handleSetSelection= () => {
    if (socketService.socket)
      gameActionService.onSetSelection(socketService.socket, (message) => {
        console.log("selection=> ", message);
        setIsOptionSelected(message?.isSelected);
        setIsComputer(true);
        
        if(message?.playerSelection === humanPlayer)
          setPlayerSymbol(AIPlayer);
        else 
          setPlayerSymbol(humanPlayer);
       
      });
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
    handleSetSelection();
    //handleRestart();
  }, []);

  const handleRestart = () =>{
    if(socketService.socket)
    {
      gameActionService.onRestart(socketService.socket, (message) =>{
        props.onRestart();
      })
    }
  }

  useEffect(() => {
    if (!isPlayerTurn)
      setTimeout(() => {
        if(playerSymbol === humanPlayer)
          computerMove(AIPlayer);
        else 
          computerMove(humanPlayer);
       // computerMove();
      }, 1000);
  }, [isPlayerTurn]);

 const handlePlayerClick = (innerIndex, outerIndex, playerSymbol)=>{
  setPlayerSymbol(playerSymbol);
  updateGameMatrix(innerIndex, outerIndex, playerSymbol);
  setPlayerTurn(false);
 }
  
  const buttonHandler = ()=>{
    if(socketService.socket)
    {
      gameActionService.restart(socketService.socket,true);
      props.onRestart();
    }
  }

  const setPlayerSelection = ()=>{
    if(socketService.socket)
    {
      gameActionService.setSelection(socketService.socket,{playerSelection: playerSymbol, isSelected: true});
    }
  }

  const selectPlayer = (playerSelection)=>{
    setPlayerSymbol(playerSelection);
    setIsOptionSelected(true);
    setPlayerSelection();
    //handleGameUpdate();
    //handleGameStart();
    //handleGameWin();
  }

  return (
    <div className="container w-80 bg-opacity-25">
      {!isGameStarted ? (
        <h2>Waiting for Other Player to Join to Start the Game!</h2>
      ):
      <>
      {/* <Timer/> */}
      <button onClick={buttonHandler} className="btn btn-primary">Restart</button>
      </>
      }
      { !isOptionSelected ? (
        <>
      <h1>Select option : </h1>
      <button onClick={()=>selectPlayer(humanPlayer)} className="btn btn-primary">X</button>
      <button onClick={()=>selectPlayer(AIPlayer)} className="btn btn-primary">O</button>
      </>): ''
      }
      {(isComputer) && <div className="PlayStopper" />}
      {result.length ? <h1>{result}</h1> : null}
      { isOptionSelected ? <div className="row d-flex justify-content-center">
            <table className="table">
              <tbody>
        {matrix.map((row, outerIndex) => (
          <tr key={outerIndex}>
              {row.map((column, innerIndex) => (
                <td
                className="text-center border-2 border-dark border-rounded"
                key={innerIndex}
              >
                <button
                  className="cell btn btn-secondary"
                  id={outerIndex * 5 + innerIndex}
                  onClick={() =>
                    handlePlayerClick(innerIndex, outerIndex, playerSymbol)
                  }
                >
                  {column && column !== "null" ? (
                    column === "x" ? (
                      "X"
                    ) : (
                      "O"
                    )
                  ) : ""}
                </button>
                </td>
              ))}
              </tr>
            ))}
            </tbody>
            </table>
            </div>: ''}
    </div>
  );
}
