import React from "react";
import {useEffect} from "react";
import {useState} from "react";

const Clock = () => {
  const [currTime, setCurrTime] = useState(new Date());
  useEffect(() => {
    setTimeout(() => {
      setCurrTime(new Date(currTime.getTime() + 1000));
    }, 1000);
  }, [currTime]);
  return (<div>
    <div className="bg-dark text-light m-1 p-1 rounded">
      {currTime.getFullYear()}년 {currTime.getMonth()}월 {currTime.getDate()}
      일
    </div>
    <div className="bg-dark text-light m-1 p-1 rounded">
      {currTime.getHours()}시 {currTime.getMinutes()}분{" "}
      {currTime.getSeconds()}초
    </div>
  </div>);
};

const Timer = () => {
  const [timerID, setTimerID] = useState(false);
  const [timeDelta, setTimeDelta] = useState<number>(0);

  useEffect(() => {
    if (timerID) {
      const interval = setInterval(() => {
        setTimeDelta((timeDelta) => timeDelta + 1);
      }, 1000);

      return() => {
        clearInterval(interval);
      };
    }
  }, [timerID]);
  return (<div>
    <div>{timeDelta}</div>
    <button onClick={() => {
        setTimeDelta(0);
      }}>
      Reset!
    </button>
    <button onClick={() => {
        setTimerID(true);
      }}>
      Start!
    </button>

    <button onClick={() => {
        setTimerID(false);

        console.log(timerID);
      }}>
      Stop!
    </button>
  </div>);
};
export default Clock;
export {
  Timer
};
