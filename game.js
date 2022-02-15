import player, {Player} from './player'

class game extends Player {
    
    state = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]; 
    board
    timer = 0
    constructor () {

    }

    setBoard() {
       this.board = Array(5).fill(Array(5));  
    }

    getBoard () {
        return this.board
    }

    setState(index) {
        this.state[index] = this.playerType
    }

    getState() {
        return this.state
    }

    setTimer(timer) {
        this.timer = timer
    }

    getTime() {
        return this.timer
    }

    gameRestart() {
        this.state = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        this.setBoard()
        this.setTimer(0)
    
    }
}

