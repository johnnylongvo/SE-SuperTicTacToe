import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class controllerForGame {
  private get_socketForGameRoom(s: Socket): string {
    const sr = Array.from(s.rooms.values()).filter(
      (r) => r !== s.id
    );
    const place = sr && sr[0];

    return place;
  }

  @OnMessage("game is updated")
  public async refresh(
    @SocketIO() io: Server,
    @ConnectedSocket() s: Socket,
    @MessageBody() sendM: any
  ) {
    const gameRoom = this.get_socketForGameRoom(s);
    s.to(gameRoom).emit("in game update", sendM);
  }

  @OnMessage("Winner chicken dinner")
  public async win(
    @SocketIO() io: Server,
    @ConnectedSocket() s: Socket,
    @MessageBody() sendM: any
  ) {
    const gameRoom = this.get_socketForGameRoom(s);
    s.to(gameRoom).emit("win", sendM);
  }
  
  @OnMessage("Restart game")
  public async restart(
    @SocketIO() io: Server,
    @ConnectedSocket() s: Socket,
    @MessageBody() sendRFlag: any
  ) {
    // console.log("socket>>>>",s,"io>>>>",io)
    const gameRoom = this.get_socketForGameRoom(s);
    console.log("Message room flag>>>>",sendRFlag)
    s.to(gameRoom).emit("restart", sendRFlag);
    io.in(gameRoom).socketsLeave(gameRoom);
    console.log("game room flag>>>>",gameRoom)
  }

  @OnMessage("Set player selection")
  public async setSelection(
    @SocketIO() io: Server,
    @ConnectedSocket() s: Socket,
    @MessageBody() sendRFlag: any
  ) {
    // console.log("socket>>>>",s,"io>>>>",io)
    const gameRoom = this.get_socketForGameRoom(s);
    //console.log("Message room flag>>>>",sendRFlag)
    s.to(gameRoom).emit("setSelection", sendRFlag);
    // io.in(gameRoom).socketsLeave(gameRoom);
    // console.log("game room flag>>>>",gameRoom)
  }
}
