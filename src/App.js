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
import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import AIvsAI from "./AIvsAI";
import ChangeTimeoutPopupHOC from './components/changeTimeout/HOC/changeTimeoutPopupHOC';
import ChangeTimeout from './components/changeTimeout/changeTimeout';
import Timer from './components/Timer/Timer';

function App(props) { 
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

    if (matrix.every((x) => x.every((z) => z !== null))) {
      return (winner = "tie"); //return [true, true];
    }
    return winner; // return [false, false];
  };

  var sectionStyle = {
    backgroundImage: `url(${BGImage})`,
  };

  const countXPlayerWins = (row, player)=>{
    var count = 0, index;
    row.filter(item=> {
      if(item === player){
        count++;
      }
    });
    if(count >= 3){
      row.filter((item, i)=> {
        if(item === null){
          index = i;
        }
      });
    }
    return {status: count>=3, index};
  }

  function checkWinner(board, player) {
    let winner = null;
    var row,column;

    for (let i = 0; i < matrix.length; i++) {
      let columnArr = [];
      let rowArr = [];
    
      //get each column
      for (let j = 0; j < matrix[i].length; j++) {
        columnArr.push(matrix[j][i]);
      }

      //get each row
      for (let k = 0; k < matrix[i].length; k++) {
        rowArr.push(matrix[i][k]);
      }

      let resultColumn = countXPlayerWins(columnArr ,player);
      let resultRow = countXPlayerWins(rowArr, player);

      if (resultColumn.status === true && resultColumn.index != undefined) {
        winner= player;
        row= resultColumn.index;
        column = i;        
      }
      if (resultRow.status === true && resultRow.index != undefined) {
        winner= player;
        row= i;
        column = resultRow.index;        
      }
    }

    let diagonal1 = [];

    for(let i = 0;i <5; i++){
      for(let j=0;j<5;j++){
        if(i === j){
          diagonal1.push(matrix[i][j]);
        }
      }
    }

    let resultDiagonal1 = countXPlayerWins(diagonal1, player);
    if (resultDiagonal1.status === true && resultDiagonal1.index != undefined) {
      winner= player;
      row= resultDiagonal1.index;
      column = resultDiagonal1.index;        
    }


    let diagonal2 = [];

    for(let i = 0;i <5; i++){
      for(let j=0;j<5;j++){
        if(i === (4-j)){
          diagonal2.push(matrix[i][j]);
        }
      }
    }

    let resultDiagonal2 = countXPlayerWins(diagonal2, player);
    if (resultDiagonal2.status === true && resultDiagonal2.index != undefined) {
      winner= player;
      row= resultDiagonal2.index;
      column = (4-resultDiagonal2.index);        
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


  const computerMove = () => {
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

          let result = checkWinner(newMatrix, humanPlayer);
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
          if (!found) {
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
    let resultOPlayer = checkWinner(newMatrix, AIPlayer);

    if (
      !found &&
      resultOPlayer.row !== null &&
      resultOPlayer.column !== null &&
      resultOPlayer.row !== undefined &&
      resultOPlayer.column !== undefined
    ) {
      move = { i:resultOPlayer.row , j: resultOPlayer.column };
    }

    //let aiBlock = minimax(newMatrix, 0, false);

    matrix[move.i][move.j] = AIPlayer;
    setMatrix(matrix);
    setPlayerMove(false);
  };

  useEffect(() => {
    if (isPlayerMove) {
      const timeout =  setTimeout(() => {
        computerMove();
        const winner = checkGameResult(matrix);
        if (winner === "tie") {
          alert("Draw");
          
          clearTimeout(timeout);
          handleRestart();
         // clearTimeout(timeout);
        } else if (winner === AIPlayer) {
          alert(AIPlayer + " player won");
          
          clearTimeout(timeout);
          handleRestart();

        } else{
         
        }
      }, 1000);
    }
  }, [isPlayerMove]);

  useEffect(() => {
    if (!isPlayerMove && isAISelected) {
     const timeout = setTimeout(() => {
        handleAIvsAI();
      }, 1000);
    }
  }, [isPlayerMove]);

  const getEmptyBlocks = () => grid.filter((item) => typeof item === "number");

  const handleClick = (e, column, row) => {
    if (!isPlayerMove) {
      const newMatrix = [...matrix];
      const { id: blockId } = e.target;

      if (newMatrix[row][column] !== null) {
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

  const handleAIvsAIClick = (row, column) => {
    if (!isPlayerMove) {
      const newMatrix = [...matrix];

      // if (newMatrix[row][column] !== null) {
      //   alert("select other block");
      // } else {
        if (matrix[row][column] == null) {
          matrix[row][column] = "x";
          setMatrix(matrix);
        }
        else {
          console.log('not null',  matrix[row][column]);
          console.log(newMatrix);
        }

        const winner = checkGameResult(matrix);

        if (winner === "tie") {
          setMark("x");
          alert("Draw");
          handleRestart();
        } else if (winner === "x") {
          setMark("x");
          alert("You won");
          handleRestart();
        } else {
          setPlayerMove(true);
          setMark("x");
        }
      //}
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
    const newMatrix = [...matrix];
    let resultXPlayer = checkWinner(newMatrix, AIPlayer);
    let row, column;
    let isFound = false;

    if (
      resultXPlayer.row !== null &&
      resultXPlayer.column !== null &&
      resultXPlayer.row !== undefined &&
      resultXPlayer.column !== undefined
    ) {
      column = resultXPlayer.row;
      row = resultXPlayer.column;
      isFound = newMatrix[row][column] == null ? true : false;
      // move = { i:resultXPlayer.row , j: resultXPlayer.column };
    }
    

    console.log(getEmptyBlocks());

    var count = 0;

    while(!isFound){
      let rowIndex = getRndInteger(0, 4);
      let columnIndex = getRndInteger(0, 4);
      count++;

      if(newMatrix[rowIndex][columnIndex] === null){
        isFound = true;
        row = rowIndex;
        column = columnIndex;
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
          row=i;
          column = j;
          console.log(i, j);
        }
      }
    }
  }

    // console.log('x ', row, column, newMatrix[row][column], isPlayerMove);
    // console.log(newMatrix);

    handleAIvsAIClick(row,column);
  };

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const openChangeTimeoutHandler = () => {
    props.changeTimeoutToggleHandler();
    console.log(props.showchangeTimeoutPopup)
  }
  return (
    <div style={sectionStyle}>
      <div class="container w-80 bg-secondary bg-opacity-25">
        <span class="d-flex justify-content-center">
          <h1 class="d-flex justify-content-center" id="playText">
            {!isGameSelected && !isAISelected ? "Super Tic-Tac-Toe!" : ""}
            {isGameSelected ? "Player vs AI" : isAISelected ? "AI vs AI" : ""}
          </h1>
        </span>
        {(isGameSelected || isAISelected) &&
          <Timer handleParentFun={handleRestart}/>
        }
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
                  <Button onClick={openChangeTimeoutHandler}>Change Timeout</Button>
                  {
                    props.showchangeTimeoutPopup &&
                    <ChangeTimeout
                    modalClosed={props.changeTimeoutToggleHandler} />
                  }
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
                          className={`cell btn btn-secondary`}
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
 
export default ChangeTimeoutPopupHOC(App);
