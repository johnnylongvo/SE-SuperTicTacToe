mport player, { Player } from "./player";
import { Human } from "./human";

class game extends Player {
  state = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  board;
  timer = 0;
  h = new Human();

  constructor() {
    this.setBoard();
  }

  selectOponentType(type) {
    this.h.selectOponentType(type);
  }

  setBoard() {
    this.board = Array(5).fill(Array(5));
  }

  getBoard() {
    return this.board;
  }

  setState(index) {
    this.state[index] = this.playerType;
  }

  getState() {
    return this.state;
  }

  setTimer(timer) {
    this.timer = timer;
  }

  getTime() {
    return this.timer;
  }

  gameRestart() {
    this.state = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    this.setBoard();
    this.setTimer(0);
  }

  switchPlayer() {
    //switch player between AI to player.
    if (this.playerType == "X") {
      this.playerType = "O";
    } else {
      this.playerType = "X";
    }
  }

  checkRow() {
    //check all rows if player is winner or not
  }

  winner() {
    //check all possibilities to check winner
  }
}
