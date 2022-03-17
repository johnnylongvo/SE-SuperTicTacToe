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

function App() {
  const [mark, setMark] = useState("");

  const [isPlayerMove, setPlayerMove] = useState("");

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

  var sectionStyle = {
    backgroundImage: `url(${BGImage})`,
  };

  const computerMove = () => {
    const newMatrix = [...matrix];

    let col = 0,
      row = 0,
      found = false;

    newMatrix.forEach((cell, rowindex) => {
      cell.forEach((item, colIndex) => {
        if (item == null) {
          col = colIndex;
          row = rowindex;
          found = true;
          return;
        }
      });
      if (found) return;
    });
    newMatrix[row][col] = "o";
    setMatrix(newMatrix);
    setPlayerMove(false);
  };

  useEffect(() => {
    if (isPlayerMove) {
      setTimeout(() => {
        computerMove();
      }, 1000);
    }
  }, [isPlayerMove]);

  const handleClick = (e, column, row) => {
    const newMatrix = [...matrix];

    console.log(e.target.id);

    if (newMatrix[row][column] == null) {
      newMatrix[row][column] = "x";
      setMatrix(newMatrix);
    }
    setPlayerMove(true);
    setMark("x");
    // }
  };

  return (
    <div style={sectionStyle}>
      <div class="container w-80 bg-secondary bg-opacity-25">
        <span class="d-flex justify-content-center">
          <h1 class="d-flex justify-content-center" id="playText">
            Super Tic-Tac-Toe!
          </h1>
        </span>
        <div class="row justify-content-md-center">
          <ButtonToolbar aria-label="Toolbar with button groups">
            <div class="col d-grid justify-content-md-center">
              <ButtonGroup className="mb-2" aria-label="First group">
                <Button id="AIvAI">Watch AI Play</Button>
                <Button id="playAI">Play vs AI</Button>
                <Button id="playOnline">Play Online</Button>
                <TimeoutPopover />
              </ButtonGroup>
            </div>
          </ButtonToolbar>
        </div>
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
                        id={"btn" + (outerIndex * 5 + innerIndex)}
                        onClick={(e) => handleClick(e, innerIndex, outerIndex)}
                      >
                        {/* {outerIndex * 5 + innerIndex} */}
                        {column && column !== null ? (
                          column === 'x' ? 'X': 'O'
                        ): outerIndex * 5 + innerIndex}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
