import React, { useEffect, useState } from 'react'

const Timer = ({value})=> {
    const [minutes, setMinutes] = useState(value);
    const [seconds, setSeconds] = useState(0);

    useEffect(()=>{
        const myInterval = setInterval(() => {

            if (seconds > 0) {
                setSeconds(seconds -1)
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes -1)
                    setSeconds(59)
                }
            } 
        }, 1000);
        return ()=>clearInterval(myInterval);
    },[seconds, minutes]);

        return (
            <div>
                { minutes === 0 && seconds === 0
                    ? <h1>Time up!</h1>
                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
}

export default Timer;