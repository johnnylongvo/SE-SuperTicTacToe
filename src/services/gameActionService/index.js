 class GameActionService {
  async joinGame(socket, roomId) {
    return new Promise((rs, rj) => {
      socket.emit("join", { roomId });
      socket.on("joined", () => rs(true));
      socket.on("rj_error", ({ error }) => rj(error));
    });
  }

  async refresh(socket, gameMatrix) {
    socket.emit("game is updated", { matrix: gameMatrix });
  }

  async onRefresh(
    socket,
    listiner
  ) {
    socket.on("in game update", ({ matrix }) => listiner(matrix));
  }

  async onStart(
    socket,
    listiner
  ) {
    socket.on("start", listiner);
  }

  async win(socket, message) {
    socket.emit("Winner", { message });
  }

  async onWin(socket, listiner) {
    socket.on("win", ({ message }) => listiner(message));
  }
  async restart(socket, restartFlag) {
    socket.emit("Restart game", { restartFlag });
  }

  async onRestart(socket, listiner) {
    socket.on("restart", ({ restartFlag }) => {
      debugger
      console.log("restartFlag>>>>>>>>",restartFlag)
      return listiner(restartFlag)
    });
  }

  async setSelection(socket, restartFlag) {
    socket.emit("Set player selection", { restartFlag });
  }

  async onSetSelection(socket, listiner) {
    socket.on("setSelection", ({ restartFlag }) => {
      debugger
      console.log("setSelection>>>>>>>>",restartFlag)
      return listiner(restartFlag)
    });
  }
}

export default new GameActionService();
