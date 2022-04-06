import React, { useContext, useState } from "react";
import gameContext from "../../Context/gameContext";
import gameActionService from "../../services/gameActionService";
import socketService from "../../services/socketService";
 
export function JoinRoom(props) {
  const [roomValue, setRoomValue] = useState("");
  const [isJoin, setJoin] = useState(false);

  const { setInRoom, isInRoom } = useContext(gameContext);

  const handleRoomValueChange = (e) => {
    const value = e.target.value;
    setRoomValue(value);
  };

  const joinRoom = async (e) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!roomValue || roomValue.trim() === "" || !socket) return;

    setJoin(true);

    const joined = await gameActionService
      .joinGame(socket, roomValue)
      .catch((err) => {
        alert(err);
      });

    if (joined) setInRoom(true);

    setJoin(false);
  };

  return (
    <form onSubmit={joinRoom}>
      <div className="JoinRoomContainer">
        <h4>Enter Any ID : </h4>
        <input
        className="RoomIdInput"
          placeholder="Enter any ID"
          value={roomValue}
          onChange={handleRoomValueChange}
        />
        <button className="JoinButton mb-2" type="submit" disabled={isJoin}>
          {isJoin ? "Joining..." : "Join"}
        </button>
      </div>
    </form>
  );
}
