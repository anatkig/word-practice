import React, { Dispatch, SetStateAction } from 'react';
import Clock from '../Clock/Clock';
import './counter-box.css';

const CounterBox = ({ count, play, setPlay, timerStopper, learntToday }: {
    count: number,
    play: boolean,
    setPlay: Dispatch<SetStateAction<boolean>>,
    timerStopper: number,
    learntToday: number
}) => {


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