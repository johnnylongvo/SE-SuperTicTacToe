import React, { useContext, useEffect, useState } from "react";
import gameContext from "../../Context/gameContext";
import gameActionService from "../../services/gameActionService";
import socketService from "../../services/socketService"; 
import Timer from "../Timer/Timer"; 
// export type IPlayMatrix = Array<Array<string | null>>;
// export interface IStartGame {
//   start: boolean;
//   symbol: "x" | "o";
// }

export function Game(props) {
  const [mark, setMark] = useState('');

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

  // const timeout = setTimeout(() => {
  //   if (!allFilled)
  //     computerMove();
  // }, 5000);

  const computerMove = () => {
    const newMatrix = [...matrix];
    // var emptyCells = [];
    // var random;
    let col = 0, row = 0;

    // /*  for (var i = 0; i < cells.length; i++) {
    //     if (cells[i].textContent == '') {
    //       emptyCells.push(cells[i]);
    //     }
    //   }*/

    let found = false;
    newMatrix.forEach(function (cell, rowIndex) {
      cell.forEach((item, colIndex) => {
        if (item == null) {
          col = colIndex;
          row = rowIndex;
          found = true;
          return;
        } else {
          //allFilled = true;
        }
      });

      if (found)
        return;

    });

    // // computer marks a random EMPTY cell
    // random = Math.ceil(Math.random() * emptyCells.length) - 1;
    // emptyCells[random].textContent = mark;

    if (found && isPlayerTurn) {
      updateGameMatrix(col, row, playerSymbol);
      //switchMove('o');
    }

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

      setPlayerTurn(false);
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
        setPlayerTurn(true);
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
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);

      });
  };

  const clickHandler = () => {
    window.location.href = "/";
  }

  const handleGameWin = () => {
    if (socketService.socket)
      gameActionService.onWin(socketService.socket, (message) => {
        console.log("win=> ", message);
        setPlayerTurn(false);
        // alert(message);
        setResult(message);
      });
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, []);

  useEffect(() => {
    if (isPlayerTurn)
      setTimeout(() => {
        computerMove();
      }, 1000);
  }, [isPlayerTurn]); 
  return (
    <div class="container w-80 bg-opacity-25">
      {!isGameStarted ? (
        <h2>Waiting for Other Player to Join to Start the Game!</h2>
      ):<Timer/>}
      {(!isGameStarted || !isPlayerTurn) && <div className="PlayStopper" />}
      {result.length ? <h1>{result}</h1> : null}
      <div class="row d-flex justify-content-center">
            <table class="table">
              <tbody>
        {matrix.map((row, outerIndex) => (
          <tr key={outerIndex}>
              {row.map((column, innerIndex) => (
                <td
                class="text-center border-2 border-dark border-rounded"
                key={innerIndex}
              >
                <button
                  className="cell btn btn-secondary"
                  id={outerIndex * 5 + innerIndex}
                  onClick={() =>
                    updateGameMatrix(innerIndex, outerIndex, playerSymbol)
                  }
                >
                  {column && column !== "null" ? (
                    column === "x" ? (
                      "X"
                    ) : (
                      "O"
                    )
                  ) : outerIndex * 5 + innerIndex}
                </button>
                </td>
              ))}
              </tr>
            ))}
            </tbody>
            </table>
            </div>
      {result.length ? <button onClick={clickHandler} className="StartBtn" >Start New Game</button> : 
      null}
    </div>
  );
}
