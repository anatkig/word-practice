import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './clock.css';

const Clock = ({ play, setPlay, timerStopper }: {
    play: boolean,
    setPlay: Dispatch<SetStateAction<boolean>>,
    timerStopper: number
}) => {

    const [time, setTime] = useState(timerStopper);

    useEffect(() => {
        setTime(timerStopper)
    }, [timerStopper]);

    useEffect(() => {
        if (!play) {
            setTime(timerStopper);
        }
    }, [play, timerStopper])


    useEffect(() => {

        let interval: NodeJS.Timeout | null = null;

        if (time > 0 && time < timerStopper) {
            if (play) {
                interval = setInterval(() => {
                    setTime(prev => prev - 1);
                }, 100)
            }

        } else {
            setPlay(false);
            localStorage.setItem("wordIndex", "");
        };
        return () => clearInterval(interval as NodeJS.Timeout);
    }, [play, time, setPlay, timerStopper])


    return (
        <div id="clock">
            <p id="minutes" className='time'>{String(Math.floor(time / 10 / 60)).padStart(2, "0")}</p>
            :
            <p id="seconds" className='time'>{String(Math.floor(time / 10) % 60).padStart(2, "0")}</p>
            :
            <p id="milliseconds" className='time'>{String(time % 10).padStart(2, "0")}</p>
        </div>
    )
}

export default Clock;