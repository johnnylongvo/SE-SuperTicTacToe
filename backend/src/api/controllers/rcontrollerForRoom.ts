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
    console.log("New ID joining", message);

    const socketsJoined = io.sockets.adapter.rooms.get(message.roomId);
    const rooms = Array.from(s.rooms.values()).filter(
      (r) => r !== s.id
    );

    if (
      rooms.length > 0 ||
      (socketsJoined && socketsJoined.size === 2)
    ) {
      s.emit("rj_error", {
        error: "Room is full pick another room",
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


// import {
//   ConnectedSocket,
//   MessageBody,
//   OnMessage,
//   SocketController,
//   SocketIO,
// } from "socket-controllers";
// import { Server, Socket } from "socket.io";

// @SocketController()
// export class RoomController {
//   @OnMessage("join_game")
//   public async joinGame(
//     @SocketIO() io: Server,
//     @ConnectedSocket() socket: Socket,
//     @MessageBody() message: any
//   ) {
//     console.log("New User joining room: ", message);

//     const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
//     const socketRooms = Array.from(socket.rooms.values()).filter(
//       (r) => r !== socket.id
//     );

//     if (
//       socketRooms.length > 0 ||
//       (connectedSockets && connectedSockets.size === 2)
//     ) {
//       socket.emit("room_join_error", {
//         error: "Room is full please choose another room to play!",
//       });
//     } else {
//       await socket.join(message.roomId);
//       socket.emit("room_joined");

//       if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
//         socket.emit("start_game", { start: true, symbol: "x" });
//         socket
//           .to(message.roomId)
//           .emit("start_game", { start: false, symbol: "o" });

//           console.log("symbol: ", 'o');
//       }
//     }
//   }
// }
