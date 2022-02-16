
export default class player {
    playerNumber = 0
    playerType = 0
    move = Array(5).fill(Array(5));
    timeOut = 0

    constructor (playerNumber, playerType) {
        this.playerNumber = playerNumber
        this.playerType = playerType
    }

    getPlayerNumber() {
        return this.playerNumber;

    }

    getPlayerType() {
        return this.playerType
    }

    setTimeout(timeOut) {
        this.timeout = timeOut
    }

    getTimeOut(){
        return this.timeOut
    }

    setMove(move, i, j){
        this.move[i][j] = move
        super.switchPlayer();
    }

    getMove(){
        return this.move
    }

}
