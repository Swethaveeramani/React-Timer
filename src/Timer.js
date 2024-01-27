import React, { useState, useEffect } from 'react';
import './App.css';
import { Howl } from 'howler';
import soundFile from './keyboard-153960.mp3';
import Try from './Try';

function App() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60); // default: 60 seconds (1 minute)
  const [tasks, setTasks] = useState([]);
  const [buttonColor, setButtonColor] = useState('green'); // default: green

  const alertSound = new Howl({
    src: [soundFile],
  });

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = { ...prevTime };

          // Increment seconds
          newTime.seconds++;

          // Check for overflow to minutes
          if (newTime.seconds === 60) {
            newTime.seconds = 0;
            newTime.minutes++;

            // Check for overflow to hours
            if (newTime.minutes === 60) {
              newTime.minutes = 0;
              newTime.hours++;
            }
          }

          // Check if the timer is finished
          const totalSeconds = newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds;
          if (totalSeconds === timerDuration) {
            alertSound.play(); // Play sound when the timer finishes
            setIsActive(false);
            setButtonColor('green'); // Change button color back to green after timer finishes
            handleSaveTask(); // Save task when the timer finishes
          }

          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, alertSound, timerDuration]);

  const handleStartStop = () => {
    if (!isActive) {
      // Start the timer
      setIsActive(true);
      setButtonColor('red');
    } else {
      // Stop the timer
      setIsActive(false);
      setButtonColor('green');
      handleSaveTask(); // Save task when the user stops the timer
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setButtonColor('green');
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const handleSaveTask = () => {
    const duration = formatTime(time);
    const newTask = { duration };
    setTasks([...tasks, newTask]);
  };

  const handleSetTimer = (duration) => {
    setIsActive(true);
    setTimerDuration(duration);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const formatTime = ({ hours, minutes, seconds }) => {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
    <div className="App">
      <h1>React Timer App</h1>
<Try/>
      <div className="timer" style={{ backgroundColor: buttonColor }}>
        {formatTime(time)}
      </div>
      <div className="buttons">
        <button onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => handleSetTimer(60)}>1 Minute</button>
        <button onClick={() => handleSetTimer(120)}>2 Minutes</button>
        <button onClick={() => handleSetTimer(180)}>3 Minutes</button>
      </div>
      <div className="task-table">
        <h2>Task Table</h2>
        <table>
          <thead>
            <tr>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></>
  );
}

export default App;
