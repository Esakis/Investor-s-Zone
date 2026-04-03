import { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock-compact">
            <span className="clock-time">{time}</span>
            <span className="clock-date">{date}</span>
        </div>
    );
}

export default Clock;