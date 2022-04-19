import React from "react";
 
const defaultState = {
  isInRoom: false,
  setInRoom: () => {},
  playerSymbol: "x",
  setPlayerSymbol: () => {},
  isPlayerTurn: true,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
};

export default React.createContext(defaultState);
