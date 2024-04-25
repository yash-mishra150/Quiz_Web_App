"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';


const YourPage = (handleResend) => {
    const [seconds, setSeconds] = useState(() => {
        // Initialize from local storage if available, otherwise default to 60 seconds
        if (typeof window !== 'undefined') {
            // Perform localStorage action
            const storedSeconds = localStorage.getItem('timerSeconds');
            return storedSeconds ? parseInt(storedSeconds, 10) : 60;
        }


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
    function handleSubmit(e) {
        e.preventDefault();
        setSeconds(60);
        setTimerComplete(false);
    }

    return (
        <div>
            {/* <h1>Your Page</h1>
            <p>Timer: {minutes < 10 ? '0' : ''}{minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</p>
            {timerComplete &&
                <button onClick={handleSubmit}>
                    <a>Go to Destination Page</a>
                </button>

            } */}
            <h1 className='md:ml-2 mt-10 text-sm md:text-xs lg:text-md text-[#4E63CE]'>Didn&apos;t Received? <button onClick={handleSubmit} disabled={timerComplete} className='font-bold disabled:text-[#4c5896] mr-1'>Resend</button>{minutes < 10 ? '0' : ''}{minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</h1>
        </div>
    );
};

export default YourPage;
