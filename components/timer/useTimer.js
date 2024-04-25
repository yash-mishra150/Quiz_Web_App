import { useState, useEffect } from 'react';

const useTimer = () => {
    const initialTimeLeft = localStorage.getItem("timeLeft") ? parseInt(localStorage.getItem("timeLeft")) : null;
    const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

    useEffect(() => {
        if (timeLeft === null) {
            return; // Don't start the timer if timeLeft is null
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem("timeLeft", 60); // Reset timer to 60 seconds when it reaches 0
                    }
                    return 60;
                }
                if (typeof window !== 'undefined') {
                    localStorage.setItem("timeLeft", prevTime - 1); // Update localStorage every second
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Clean up the interval on component unmount
    }, [timeLeft]); // Run the effect whenever timeLeft changes

    const resetTimer = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("timeLeft", 60); // Reset localStorage to 60 seconds
        }
        setTimeLeft(60); // Reset timer to 60 seconds
    };

    return { timeLeft, resetTimer };
};

export default useTimer;
