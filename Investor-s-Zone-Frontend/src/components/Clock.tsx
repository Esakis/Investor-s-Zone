import * as React from 'react';
import { useState } from 'react';


const Clock = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    setTimeout(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)
    })
    setTimeout(() => {
        setInterval(() => {
            setDate(new Date().toLocaleDateString())
        }, 1000)
    })

    return (
        <div className="clock">
            <h1>{new Date().toLocaleTimeString()}</h1>
            <h2>{new Date().toLocaleDateString()}</h2>
        </div>

    );
}

export default Clock;