import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [isCounting, setIsCounting] = useState(false);
  const [time, setTime] = useState(0);
  const [lap, setLap] = useState([]);

  useEffect(() => {
    if (!isCounting) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);

  const recordLap = (seconds) => {
    setLap((prev) => [...prev, seconds]);
    return seconds;
  };

  const resetTime = () => {
    setIsCounting(false);
    setTime(0);
    setLap([]);
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
    const millis = String(Math.floor((seconds % 1) * 100)).padStart(2, "0");
    return `${mins}:${secs}:${millis}`;
  };

  return (
    <div className="App">
      <div>
        <div className="time-container">{formatTime(time)}</div>
        <div className="btn-container">
          <button
            onClick={() => {
              if (isCounting) {
                recordLap(time);
              } else {
                resetTime();
              }
            }}
          >
            {isCounting ? "Lap" : "Reset"}
          </button>
          <button
            onClick={() => {
              setIsCounting((prev) => !prev);
            }}
          >
            {isCounting ? "Stop" : "Start"}
          </button>
        </div>
        <div>
          {lap.map((item, index) => (
            <div key={index} className="lap-container">
              <p>Lap {index + 1}</p>
              <p>{formatTime(item)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
