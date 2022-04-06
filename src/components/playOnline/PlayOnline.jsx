import React, { useEffect, useState } from "react";
import socketService from "../../services/socketService";
import { JoinRoom } from "../joinRoom";
import GameContext from "../../Context/gameContext";
import { Game } from "../game";


function PlayOnline(props) {
  debugger
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectSocket = async () => {
    await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <div className="mt-2">
          {!isInRoom && <JoinRoom />}
          {isInRoom && <Game onRestart={props.handleRestart}/>}
      </div>
    </GameContext.Provider>
  );
}

export default PlayOnline;
