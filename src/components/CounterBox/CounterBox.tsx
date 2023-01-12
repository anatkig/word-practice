import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import localStorageGetCorrectInputsToday from '../../logic/localStorageGetCorrectInputsToday';
import Clock from '../Clock/Clock';
import './counter-box.css';

const CounterBox = ({ count, play, setPlay, timerStopper, learntToday }: {
    count: number,
    play: boolean,
    setPlay: Dispatch<SetStateAction<boolean>>,
    timerStopper: number,
    learntToday: number
}) => {

    const [correctInputs, setCorrectInputs] = useState(localStorageGetCorrectInputsToday);

    useEffect(() => {

        if (count > 0) {
            setCorrectInputs(prev => prev + 1);
        }

        const date = new Date();
        const curHour = date.getHours();
        const curMin = date.getMinutes();

        const hoursLeft = 24 - curHour;
        const timeLeftInMilSec = (hoursLeft * 60 - curMin) * 60000;

        const timeout = setTimeout(() => {

            setCorrectInputs(0);

        }, timeLeftInMilSec);

        return () => clearTimeout(timeout);

    }, [count])

    useEffect(() => {
        localStorage.setItem("correctInputsToday", JSON.stringify(correctInputs));
    }, [correctInputs])

    return (
        <>
            <div id="counter-box">
                <Clock play={play} setPlay={setPlay} timerStopper={timerStopper} />
                <div className="counter">Score: {count}</div>
                <div className="counter">Learnt Today: {learntToday}</div>
                <div className="counter">Correct Inputs Today: {correctInputs}</div>
            </div>
        </>
    )
}

export default CounterBox;