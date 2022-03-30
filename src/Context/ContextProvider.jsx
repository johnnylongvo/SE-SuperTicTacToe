import React, { createContext, useReducer } from 'react';

import contextReducer from './contextReducer';

const initialState = {
   minutes:5,
   seconds:0
};

export const TimerContext = createContext(initialState);

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  function setTimer(timer) {
    dispatch({
      type: "SET",
      payload: timer
    });
  }

  function resetTimer() {
    dispatch({
      type: "RESET",
    });
  }

  return (
    <TimerContext.Provider
      value={{
        time: state,
        setTimer,
        resetTimer
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};