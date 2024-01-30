import React, { useEffect, useState } from 'react';

function Timer({ initialTime, onTimeUp }) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }

        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timeLeft, onTimeUp]);

    return (
        <div>
            Time left: {timeLeft} seconds
        </div>
    );
}

export default Timer;
