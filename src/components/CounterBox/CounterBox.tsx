import React, { Dispatch, SetStateAction } from 'react';
import Clock from '../Clock/Clock';
import './counter-box.css';

const CounterBox = ({ count, play, setPlay, timerStopper }: {
    count: number,
    play: boolean,
    setPlay: Dispatch<SetStateAction<boolean>>,
    timerStopper: number
}) => {
    return (
        <>
            {play &&
                <div id="counter-box">


                    <Clock play={play} setPlay={setPlay} timerStopper={timerStopper} />
                    <div id="counter">{count}</div>

                </div>
            }
        </>
    )
}

export default CounterBox;