import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import BGImage from "./XO.png";
import Popover from "react-bootstrap/Popover";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import "./App.css";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import AIvsAI from "./AIvsAI";

function App() {
  const [isGameSelected, setIsGameSelected] = useState(false);
  const [isAISelected, setIsAISelected] = useState(false);

  const [mark, setMark] = useState("");
  const [grid, setGrid] = useState(Array.from(Array(25).keys()));
  const humanPlayer = "x";
  const AIPlayer = "o";

  let scores = {
    X: 10,
    O: -10,
    tie: 0,
  };

  const [isPlayerMove, setPlayerMove] = useState(false);
  const [isAIMove, setAIMove] = useState(false);

  const [matrix, setMatrix] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  const winningConditions = [
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

  const minimax = (board, depth, isMaximizing) => {
    let result = checkWinner(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          // Is the spot available?
          if (board[i][j] == null) {
            board[i][j] = AIPlayer;
            let score = minimax(board, depth + 1, false);
            board[i][j] = null;
            // bestScore = max(score, bestScore);
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          // Is the spot available?
          if (board[i][j] == null) {
            board[i][j] = humanPlayer;
            let score = minimax(board, depth + 1, true);
            board[i][j] = null;
            //bestScore = min(score, bestScore);
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
  };

  const checkGameResult = (matrix) => {
    let winner = null;

    for (let i = 0; i < matrix.length; i++) {
      let row = [];

      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }
      if (row.every((value) => value && value === "o")) {
        return (winner = "o"); //[true, false];
      } else if (row.every((value) => value && value === "x")) {
        return (winner = "x"); //[false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];

      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }
      if (column.every((value) => value && value === "o")) {
        return (winner = "o"); //return [true, false];
      } else if (column.every((value) => value && value === "x")) {
        return (winner = "x"); //return [false, true];
      }
    }

    console.log(matrix);

    // let y = 0;
    // for (let i = 0; i < 5; i++) {
    //   for (let j = 0; j < 5; j++) {
    //     if (matrix[i][j] != null) {
    //       let tempGrid = [...grid];
    //       tempGrid[y]= matrix[i][j];
    //       setGrid(tempGrid);
    //     }
    //   }
    // }

    // console.log(grid);

    // for (let i = 0; i < winningConditions.length; i++) {
    //   const [a, b, c, d, e] = winningConditions[i];
    //   if (
    //     grid[a] &&
    //     grid[a] === grid[b] &&
    //     grid[a] === grid[c] &&
    //     grid[a] === grid[d] &&
    //     grid[a] === grid[e]
    //   ) {
    //     if (grid[a] === "o") return [true, false];
    //     else return [false, true];
    //   }
    // }

    if (matrix.every((x) => x.every((z) => z !== null))) {
      return (winner = "tie"); //return [true, true];
    }
    return winner; // return [false, false];
  };

  var sectionStyle = {
    backgroundImage: `url(${BGImage})`,
  };

  function equals3(a, b, c, d, e) {
    let count = 0;
    //if(a != null){
    if ((a === b || a === c || a === d || a === e) && a != null && a !== 'o') {
      count++;
    }
    if ((b === c || b === d || b === e) && b != null && b !== 'o') {
      count++;
    }
    if ((c === d || c === e) && c != null & c !== 'o') {
      count++;
    }
    if (d === e && d != null && d !== 'o') {
      count++;
    }
    //}
    return [count, count === 4];
  }

  function checkWinner(board) {
    let winner = null;
    let row,column;

    // horizontal
    for (let i = 0; i < 5; i++) {
      let [count, status] = equals3(
        board[i][0],
        board[i][1],
        board[i][2],
        board[i][3],
        board[i][4]
      );
      if (status || count >= 2) {
        winner = humanPlayer; //board[i][0];
      }
    }

    // Vertical
    for (let i = 0; i < 5; i++) {
      let [count, status] = equals3(
        board[0][i],
        board[1][i],
        board[2][i],
        board[3][i],
        board[4][i]
      );
      if (status || count >= 2) {
        winner = humanPlayer; //board[0][i];
      }
    }

    // Diagonal
    let [count1, status1] = equals3(
      board[0][0],
      board[1][1],
      board[2][2],
      board[3][3],
      board[4][4]
    );
    if (status1 || count1 >= 2) {
      winner = 'd2';//humanPlayer; //board[0][0];
      for(let i = 0;i <5; i++){
        for(let j=0;j<5;j++){
          if(i === j && board[i][j] === null){
            row= i;
            column = j;
          }
        }
      }
    }

    let [count2, status2] = equals3(
      board[4][0],
      board[3][1],
      board[2][2],
      board[1][3],
      board[0][4]
    );
    if (status2 || count2 >= 2) {
      winner = 'd2';//humanPlayer; //board[4][0];
      for(let i = 0;i <5; i++){
        for(let j=0;j<5;j++){
          if(i === (4-j) ){
            console.log(i,j);
          }
          if(i === (4-j) && board[i][j] === null){
            row= i;
            column = j;
          }
        }
      }
    }

    let openSpots = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (board[i][j] == null) {
          openSpots++;
        }
      }
    }

    if (winner == null && openSpots === 0) {
      return "tie";
    } else {
      return {winner, row, column};
    }
  }

  function countDuplicate(arr) {
    let count = 0,
      j = 0;
    arr.forEach((element, index) => {
      if (element === AIPlayer) {
        count++;
      }
      if (j === 0) {
        j = element == null ? index : null;
      }
    });

    return [count, j];
  }

  const arrayColumn = (arr, n) => arr.map((x) => x[n]);

  function checkOMoves(board) {
    let x, y, k, l;

    let horizontalMove = 0;
    let verticalMove = 0;

    // vertical
    for (let i = 0; i < 5; i++) {
      let arr = arrayColumn(board, i);
      let count = countDuplicate(arr);

      if (count[0] > verticalMove) {
        verticalMove = count[0];
        x = i;
        y = count[1];
      }
    }

    //horizontal
    for (let i = 0; i < 5; i++) {
      let count = countDuplicate(board[i]);
      if (count[0] > horizontalMove) {
        horizontalMove = count[0];
        k = i;
        l = count[1];
      }
    }

    if (horizontalMove > verticalMove) {
      return [k, l];
    } else if (horizontalMove < verticalMove) {
      return [x, y];
    } else if (horizontalMove === verticalMove) {
      return [x, y];
    } else {
      return [-1, -1];
    }

    // Diagonal
    // if (equals3(board[0][0], board[1][1], board[2][2], board[3][3], board[4][4])) {
    //   winner = board[0][0];
    // }
    // if (equals3(board[4][0], board[3][1], board[2][2], board[1][3], board[0][4])) {
    //   winner = board[4][0];
    // }

    // if (winner == null && openSpots == 0) {
    //   return 'tie';
    // } else {
    //   return winner;
    // }
  }

  const checkAllWin = (newGrid, player) => {
    let moves = newGrid.reduce((a, e, i) => {
      return e === player ? a.concat(i) : a;
    }, []);

    let gameWon = false;

    for (let [index, win] of winningConditions.entries()) {
      if (win.every((item) => moves.indexOf(item) > -1)) {
        gameWon = {
          index: index,
          player: player,
        };
        break;
      }
    }
    return gameWon;
  };

  const AIAlgo = (newGrid, player) => {
    console.log("check");
    const availableBlocks = getEmptyBlocks();

    if (checkAllWin(newGrid, humanPlayer)) {
      return { score: -10 };
    } else if (checkAllWin(newGrid, AIPlayer)) {
      return { score: 10 };
    } else if (availableBlocks.length === 0) {
      return { score: 0 };
    }

    let movesArr = [];

    for (let i = 0; i < availableBlocks.length; i++) {
      let move = {};
      move.index = newGrid[availableBlocks[i]];
      newGrid[availableBlocks[i]] = player;

      if (player === AIPlayer) {
        let result = AIAlgo(newGrid, humanPlayer);
        move.score = result == undefined ? 0 : result.score;
      } else {
        let result = AIAlgo(newGrid, AIPlayer);
        move.score = result == undefined ? 0 : result.score;
      }

      newGrid[availableBlocks[i]] = move.index;
      movesArr.push(move);
    }

    let smartMove;
    if (player === AIPlayer) {
      let smartScore = -10000;
      for (let i = 0; i < movesArr.length; i++) {
        if (movesArr[i].score > smartScore) {
          smartScore = movesArr[i].score;
          smartMove = i;
        }
      }
    } else {
      let smartScore = 10000;
      for (let i = 0; i < movesArr.length; i++) {
        if (movesArr[i].score > smartScore) {
          smartScore = movesArr[i].score;
          smartMove = i;
        }
      }
    }

    return movesArr[smartMove];
  };

  const computerMove = () => {
    const newMatrix = _.cloneDeep(matrix);
    let bestScore = -Infinity;
    let move;
    let col = 0,
      row = 0,
      found = false;

    //let AIBlock = AIAlgo(grid, AIPlayer);

    //check x player is winning or not
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        // Is the spot available?
        if (newMatrix[i][j] == null) {
          newMatrix[i][j] = humanPlayer;
          //let score = minimax(newMatrix, 0, false);
          let result = checkWinner(newMatrix);
          newMatrix[i][j] = null;
          //first case user select any box except middle
          if (newMatrix[2][2] === null) {
            move = { i: 2, j: 2 };
            found = true;
          } else if (result.winner === humanPlayer && (result.row !== undefined && result.column !== undefined)) {
            //winning conidtion for  'x'
            move = { i, j };
            found = true;
            break;
          } else if((result.winner === 'd1' || result.winner === 'd2') && (result.row !== undefined && result.column !== undefined)){
            
            move = { i: result.row, j: result.column };
            found = true;
            break;
            
          } else          
          if (!found) {
            // random position
            //found = true;
            move = { i, j };
            break;
          }
          // if (score > bestScore) {
          //   bestScore = score;
          //   move = { i, j };
          //   break;
          // }
        }
      }

      if (found) break;
    }

    //check best positon of 'o'
    let [i, j] = checkOMoves(newMatrix);

    if (
      i !== -1 &&
      j !== -1 &&
      !found &&
      i !== null &&
      j !== null &&
      i !== undefined &&
      j !== undefined
    ) {
      move = { i, j };
    }

    //let aiBlock = minimax(newMatrix, 0, false);

    matrix[move.i][move.j] = "o";
    setMatrix(matrix);
    setPlayerMove(false);
  };

  useEffect(() => {
    if (isPlayerMove) {
      setTimeout(() => {
        computerMove();
        const winner = checkGameResult(matrix);
        if (winner === "tie") {
          alert("Draw");
        } else if (winner === AIPlayer) {
          alert("AI won");
        }
      }, 1000);
    }
  }, [isPlayerMove]);

  const getEmptyBlocks = () => grid.filter((item) => typeof item === "number");

  const handleClick = (e, column, row) => {
    if (!isPlayerMove) {
      const newMatrix = [...matrix];
      const { id: blockId } = e.target;

      if (typeof grid[blockId] !== "number") {
        alert("select other block");
      } else {
        if (newMatrix[row][column] == null) {
          newMatrix[row][column] = "x";
          setMatrix(newMatrix);
        }

        console.log(e.target.id);
        const winner = checkGameResult(matrix);

        if (winner === "tie") {
          setMark("x");
          alert("Draw");
        } else if (winner === "x") {
          setMark("x");
          alert("You won");
        } else {
          setPlayerMove(true);
          setMark("x");
        }
      }
    }
  };

  const handlePlayAI = () => {
    setIsGameSelected(true);
  };

  const handleRestart = () => {
    setIsGameSelected(false);
    setIsAISelected(false);
    setMatrix([
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ]);
  };

  const handleAIvsAI = () => {
    setIsAISelected(true);
  };

  return (
    <div style={sectionStyle}>
      <div class="container w-80 bg-secondary bg-opacity-25">
        <span class="d-flex justify-content-center">
          <h1 class="d-flex justify-content-center" id="playText">
            {!isGameSelected && !isAISelected ? "Super Tic-Tac-Toe!" : ""}
            {isGameSelected ? "Player vs AI" : isAISelected ? "AI vs AI" : ""}
          </h1>
        </span>
        <div class="row justify-content-md-center">
          <ButtonToolbar aria-label="Toolbar with button groups">
            <div class="col d-grid justify-content-md-center">
              {isGameSelected || isAISelected ? (
                <Button id="restart" onClick={handleRestart}>
                  Restart
                </Button>
              ) : (
                <ButtonGroup className="mb-2" aria-label="First group">
                  <Button id="AIvAI" onClick={handleAIvsAI}>
                    Watch AI Play
                  </Button>
                  <Button id="playAI" onClick={handlePlayAI}>
                    Play vs AI
                  </Button>
                  <Button id="playOnline">Play Online</Button>

                  <TimeoutPopover />
                </ButtonGroup>
              )}
            </div>
          </ButtonToolbar>
        </div>
        {isGameSelected ? (
          <div class="row d-flex justify-content-center">
            <table class="table">
              <tbody>
                {/* {Array.from({ length: 5}).map((_, outerIndex) => (
                  <tr key={outerIndex}>
                      {Array.from({ length: 5}).map((_, innerIndex) => (
                        <td class="text-center border-2 border-dark border-rounded" key={innerIndex}>
                            <button class="cell btn btn-secondary" id={"btn"+((outerIndex*5)+innerIndex)} onClick={handleClick}>{(outerIndex*5)+innerIndex}</button>
                        </td>
                      ))}
                  </tr>
              ))} */}
                {matrix.map((row, outerIndex) => (
                  <tr key={outerIndex}>
                    {row.map((column, innerIndex) => (
                      <td
                        class="text-center border-2 border-dark border-rounded"
                        key={innerIndex}
                      >
                        <button
                          class="cell btn btn-secondary"
                          id={outerIndex * 5 + innerIndex}
                          onClick={(e) =>
                            handleClick(e, innerIndex, outerIndex)
                          }
                        >
                          {/* {outerIndex * 5 + innerIndex} */}
                          {column && column !== null
                            ? column === "x"
                              ? "X"
                              : "O"
                            : outerIndex * 5 + innerIndex}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : isAISelected ? (
          <AIvsAI matrix={matrix} />
        ) : (
          <div className="start-game">
            <h2>Please select any mode</h2>
          </div>
        )}
        <div class="row d-flex justify-content-center bg-opacity-25 ">
          <Card
            class="bg-opacity-25 bg-dark font-weight-bold "
            style={{ width: "18rem" }}
          >
            <ListGroup class="font-weight-bold" variant="flush">
              <ListGroup.Item class="font-weight-bold">
                Player Moving --{" "}
              </ListGroup.Item>
              <ListGroup.Item class="font-weight-bold">
                Time Remaining for Move --
              </ListGroup.Item>
              <ListGroup.Item class="font-weight-bold">
                Total Game Time --
              </ListGroup.Item>
              <ListGroup.Item class="font-weight-bold">
                Clicked Button:{" "}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Change Move Time Limit</Popover.Header>
    <Popover.Body>
      <Form id="timeout-form">
        <Form.Group>
          <Form.Label>Time Limit Per Move:</Form.Label>
          <Form.Control
            type="number"
            id="timeOutMinutes"
            placeholder="Minutes"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            id="timeOutSeconds"
            placeholder="Seconds"
          ></Form.Control>
        </Form.Group>
      </Form>
    </Popover.Body>
  </Popover>
);

const TimeoutPopover = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="primary">Change Timeout</Button>
  </OverlayTrigger>
);

export default App;
