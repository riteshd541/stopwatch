import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeInSeconds(0);
  };

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>Time: {formattedTime}</div>
      {isRunning ? (
        <button onClick={handleStop}>Stop</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default StopWatch;
