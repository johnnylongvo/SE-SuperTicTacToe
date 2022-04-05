import React, { useContext, useState } from 'react';
import ChangeTimeoutForm from './ChangeTimeoutForm';
import {TimerContext} from '../../Context/ContextProvider';

const ChangeTimeout = (props) => {
  const { time, setTimer, resetTimer } = useContext(TimerContext);

  const onSubmitForm = (min,sec) => {
    props.modalClosed();
    resetTimer();
    setTimer({minutes:+min,seconds:+sec});
  }

  const onModalClosed = () => {
    props.modalClosed();
  }

  return (
    <React.Fragment>
      <ChangeTimeoutForm 
        submitHandler={onSubmitForm}
        onModalClosed={onModalClosed}
      />
    </React.Fragment>
  );
};

export default ChangeTimeout;
