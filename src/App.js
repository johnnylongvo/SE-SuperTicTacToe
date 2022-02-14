import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
//import './App.css';
import React, { useState } from 'react';


function App() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          <Button>1</Button> <Button>2</Button> <Button>3</Button> <Button>4</Button>
        </ButtonGroup>
        <ButtonGroup className="me-2" aria-label="Second group">
          <Button>5</Button> <Button>6</Button> <Button>7</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Third group">
          <Button>8</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

export default App;