"use client"

import React, { useState, useEffect } from "react";


const Timer = () => {
    const initialTimer = localStorage.getItem("timer") || 50 * 60;
//   const [timer, setTimer] = useState(50 * 60); // 50 minutes in seconds
const [timer, setTimer] = useState(Number(initialTimer));
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const reset =() =>{
     localStorage.setItem("timer", 50*60)
     setTimer(50*60);
  }
  const start =() =>{
    localStorage.setItem("timer", 50*60)
    setIsSubmitted(false)
 }

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown);
          submitQuiz();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    localStorage.setItem("timer", timer); // Update localStorage with current timer value
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
//   console.log(timer)
  const submitQuiz = () => {
    setIsSubmitted(true);
  };
 

  return (
    <div>
      <div>
        <h1>Quiz App</h1>
        <div>Timer: {formatTime(timer)}</div>
        {!isSubmitted ? (
          <button onClick={submitQuiz}>Submit Quiz</button>
        ) : (
          <p>Quiz has been submitted!</p>
        )}
      </div>
      <button onClick={reset}>Reset</button>
      <button onClick={start}>Start</button>
    </div>
  );
};

export default Timer;
