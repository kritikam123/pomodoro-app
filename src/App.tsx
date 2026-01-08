import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const[timeLeft, setTimeLeft] = useState(25*60);
  const[isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");

  const cheerMessage = [
    "You Can Do It!",
    "I believe in you!",
    "Keep going!",
    "Stay focused!",
    "You're amazing!"

  ];

  const breakMessage = [
    "Stay hydrated",
    "Snacks, maybe?",
    "Strecch your legs",
    "Text me!"

  ];
  //Encouragement message updater
  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if(isRunning) {
      const messages = isBreak ? breakMessage : cheerMessage;
      setEncouragement(messages[0]); // set first message initially
      let index = 1

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000); // 4 seconds
    } else {
      setEncouragement("");
    }
    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

//Countdown timer
  useEffect( () => {
    let timer: NodeJS.Timeout;
    if(isRunning && timeLeft > 0)
    {
      timer = setInterval( () => {
        setTimeLeft(prev => prev - 1);
      },1000);
    }
    return() => clearInterval(timer);
  },[isRunning,timeLeft]);


  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');

    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  }

  const handleClick = () => {
    if(!isRunning) {
      setIsRunning(true);
    }else{
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25*60);
    }
  }

  return (
    <div style={{position: 'relative'}}> 
   <div>
    <button className="closeButton">
      Close
    </button>
   </div>

   <div className="home-content">
    <div className="home-controls">
      <button className="image-button" onClick={ () => switchMode(false)}>
        Work
      </button>
      <button className="image-button" onClick ={ () => switchMode(true)}>
        Break
      </button>
    </div>

    <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
      {encouragement}
    </p>
    <h1 className="home-timer">{formatTime(timeLeft)}</h1>

    <button className="home-button" onClick={handleClick}>
      Start
    </button>

   </div>
   </div>
  )
}

export default App
