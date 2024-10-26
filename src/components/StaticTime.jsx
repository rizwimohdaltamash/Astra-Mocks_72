// useStaticTime.jsx
import { useState, useEffect } from 'react';

function useStaticTime(initialTime = 60) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        // Remove any existing timeLeft from localStorage
        const userPrefix = 'yourPrefix_'; // Replace with your actual prefix
        localStorage.removeItem(`${userPrefix}timeLeft`);
        setTime(initialTime); // Ensure the time is set to the initial static value
    }, [initialTime]);

    return time;
}

export default useStaticTime;
