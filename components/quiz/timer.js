"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const YourPage = () => {
    const [seconds, setSeconds] = useState(() => {
        // Initialize from local storage if available, otherwise default to 60 seconds
        const storedSeconds = localStorage.getItem('timerSeconds');
        return storedSeconds ? parseInt(storedSeconds, 10) : 60;
    });
    const [timerComplete, setTimerComplete] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => {
                    // Store current value in local storage
                    localStorage.setItem('timerSeconds', (prevSeconds - 1).toString());
                    return prevSeconds - 1; // Decrease seconds by 1
                });
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
