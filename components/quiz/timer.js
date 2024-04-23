"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const YourPage = () => {
    const [seconds, setSeconds] = useState(60);
    const [timerComplete, setTimerComplete] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1); // Decrease seconds by 1
            } else {
                clearInterval(intervalId); // Stop the timer when seconds reach 0
                setTimerComplete(true); // Set timerComplete to true when timer finishes
            }
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    function handleSubmit(e){
      console.log("log")
    }

    return (
        <div>
            <h1>Your Page</h1>
            <p>Timer: {minutes < 10 ? '0' : ''}{minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</p>
            {timerComplete && 
                <button onClick={handleSubmit}>
                    <a>Go to Destination Page</a>
                </button>
            }
        </div>
    );
};

export default YourPage;
