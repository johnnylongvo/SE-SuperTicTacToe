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
    socket.emit("Winner chicken dinner", { message });
  }

  async onWin(socket, listiner) {
    socket.on("win", ({ message }) => listiner(message));
  }
}

export default new GameActionService();
