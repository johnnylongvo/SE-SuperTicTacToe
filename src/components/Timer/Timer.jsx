import React,{useState, useContext, useEffect} from "react"
import Button from "react-bootstrap/Button";
import { TimerContext } from '../../Context/ContextProvider';
import './Timer.css'
const Timer = (props) => {
    const { time, setTimer, resetTimer } = useContext(TimerContext);
    const [timerState, setTimerState] = useState({
      m:time.minutes,
      s:time.seconds
    }) 
    useEffect(()=>{
        handler(); 
    },[]) 
    const [timerFlag, setTimerFlag] = useState((time.minutes*60+time.seconds>0)?true:false);  
    const handler = () =>{
      let t;
      const showTimer=() =>{
        let seconds = timerState.m*60+timerState.s; 
        --seconds
        if(seconds>=0){  
          timerState.m = parseInt(seconds / 60);
          timerState.s = seconds % 60;
          setTimerState({m:timerState.m,s:timerState.s})
        }
        showTime();
  
      if (seconds<=0) {
        setTimerFlag(false);
        localStorage.clear(); 
        clearTimeout(t);
        alert('Timeout');
        props.handleParentFun();
      }
      }
      function showTime() {
        t = setTimeout(showTimer, 1000);
      }
      showTimer()
    }
    return(
        <>
            { timerFlag &&
            <div className="time-container">
                <button type="button" className="timer">{timerState.m+":"+timerState.s}</button>
            </div> 
            }
        </>
    ) 
  }

export default Timer;