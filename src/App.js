import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import BGImage from './XO.png';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import './App.css';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';

function App() {
  var sectionStyle = {
    backgroundImage: `url(${BGImage})`
  }

  const handleClick = e => {
    console.log(e.target.id);
  }

  return (
    <div style={sectionStyle}>
      <div class="container w-80 bg-secondary bg-opacity-25">
        <span class="d-flex justify-content-center">      
          <h1 class="d-flex justify-content-center" id="playText">Super Tic-Tac-Toe!</h1>
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
              {Array.from({ length: 5}).map((_, outerIndex) => (
                  <tr key={outerIndex}>
                      {Array.from({ length: 5}).map((_, innerIndex) => (
                        <td class="border border-dark border-rounded" key={innerIndex}>
                            <button class="cell btn btn-secondary" id={"btn"+((outerIndex*5)+innerIndex)} onClick={handleClick}>{(outerIndex*5)+innerIndex}</button>
                        </td>
                      ))}
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="row d-flex justify-content-center bg-opacity-25 ">
          <Card class="bg-opacity-25 bg-dark font-weight-bold " style={{ width: '18rem'}}>
            <ListGroup class="font-weight-bold" variant="flush">
              <ListGroup.Item class="font-weight-bold">Player Moving -- </ListGroup.Item>
              <ListGroup.Item class="font-weight-bold">Time Remaining for Move --</ListGroup.Item>
              <ListGroup.Item class="font-weight-bold">Total Game Time --</ListGroup.Item>
              <ListGroup.Item class="font-weight-bold">Clicked Button: </ListGroup.Item>
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
          <Form.Control type="number" id="timeOutMinutes" placeholder="Minutes"></Form.Control>
        </Form.Group>
        <Form.Group>    
          <Form.Control type="number" id="timeOutSeconds" placeholder="Seconds"></Form.Control>
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