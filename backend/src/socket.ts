import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";

export default (httpServer) => {
  const inputOutput = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  useSocketServer(inputOutput, { controllers: [__dirname + "/api/controllers/*.ts"] });

  return inputOutput;
};
