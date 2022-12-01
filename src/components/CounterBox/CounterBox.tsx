import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import localStorageRead from '../../logic/localStorageRead';
import Clock from '../Clock/Clock';
import './counter-box.css';

const CounterBox = ({ count, play, setPlay, timerStopper }: {
    count: number,
    play: boolean,
    setPlay: Dispatch<SetStateAction<boolean>>,
    timerStopper: number
}) => {

    const [learntToday, setLearntToday] = useState(0);

    useEffect(() => {
        const learnt = localStorageRead("learnt-taday");
        if (learnt) {
            const currentDate = new Date().getDate();
            if (currentDate === learnt[0]) {
                setLearntToday(learnt[1]);
            }
        }
    }, [count])

    return (
        <>
            <div id="counter-box">
                <Clock play={play} setPlay={setPlay} timerStopper={timerStopper} />
                <div className="counter">Score: {count}</div>
                <div className="counter">Learnt Today: {learntToday}</div>
            </div>
        </>
    )
}

export default CounterBox;