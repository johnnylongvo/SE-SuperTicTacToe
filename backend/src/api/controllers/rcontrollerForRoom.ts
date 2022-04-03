import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class ControllerForRoom {
  @OnMessage("join")
  public async joinGame(
    @SocketIO() io: Server,
    @ConnectedSocket() s: Socket,
    @MessageBody() message: any
  ) {
    console.log("New ID joining ", message);

    const socketsJoined = io.sockets.adapter.rooms.get(message.roomId);
    const rooms = Array.from(s.rooms.values()).filter(
      (r) => r !== s.id
    );

    if (
      rooms.length > 0 ||
      (socketsJoined && socketsJoined.size === 2)
    ) {
      s.emit("room_join_error", {
        error: "Room is full",
      });
    } else {
      await s.join(message.roomId);
      s.emit("joined");

      if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
        s.emit("start", { start: true, symbol: "x" });
        s
          .to(message.roomId)
          .emit("start", { start: false, symbol: "o" });
      }
    }
  }
}
