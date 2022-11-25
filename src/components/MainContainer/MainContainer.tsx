import React, { Dispatch, SetStateAction } from 'react';
import List from '../List/List';
import { StoredData } from '../../types/types';
import './main-container.css';
import { useEffect, useState } from 'react';
import CounterBox from '../CounterBox/CounterBox';
import WriteBox from '../WriteBox/WriteBox';
import localStorageRead from '../../logic/localStorageRead';
import arrayShuffle from '../../logic/arrayShuffle';
import localStorageWrite from '../../logic/localStorageWrite';


const MainContainer = ({ wordsToLearn, setWordsToLearn, play, setPlay }:
    {
        wordsToLearn: StoredData[],
        setWordsToLearn: Dispatch<SetStateAction<StoredData[]>>,
        play: boolean,
        setPlay: Dispatch<SetStateAction<boolean>>
    }) => {

    const [currentWords, setCurrentWords] = useState<StoredData[]>(localStorageRead("Current Words"));
    const [learntWords, setLearntWords] = useState<StoredData[]>(localStorageRead("Learnt Words"));
    const [count, setCount] = useState(0);
    const [timerStopper, setTimerStopper] = useState(600);

    useEffect(() => {
        if (!play) {
            setCount(0);
            setTimerStopper(600);
        }
    }, [play])


    useEffect(() => {
        if (!currentWords.length && (wordsToLearn.length || learntWords.length)) {
            const toLearn = wordsToLearn.slice(0, 5);
            const learnt = learntWords.slice(0, 5);
            const current = arrayShuffle([...toLearn, ...learnt]);
            setCurrentWords(current);

        } else if (currentWords.length === 9) {
            const randomWord = Math.floor(Math.random() * 2);
            if (randomWord === 0) {
                const learnt = localStorageRead("Learnt Words");
                const word = learnt[0];
                setCurrentWords(prev => [...prev, word]);

            } else if (randomWord === 1) {
                const toLearn = localStorageRead("Words to Learn");
                const word = toLearn[0];
                setCurrentWords(prev => [...prev, word]);
            }
        }
    }, [wordsToLearn, currentWords, learntWords]);


    useEffect(() => {
        const currentWordsGuTexts = currentWords.map(word => word.gu);
        setLearntWords(prev => [...prev.filter(word => !currentWordsGuTexts.includes(word.gu))]);
        setWordsToLearn(prev => [...prev.filter(word => !currentWordsGuTexts.includes(word.gu))]);
    }, [currentWords, setWordsToLearn])


    useEffect(() => {
        localStorageWrite(currentWords, "Current Words");
    }, [currentWords]);
    useEffect(() => {
        localStorageWrite(learntWords, "Learnt Words");
    }, [learntWords]);
    useEffect(() => {
        localStorageWrite(wordsToLearn, "Words to Learn");
    }, [wordsToLearn])

    return (
        <div id="main-container">
            <div className='main-column'><List name={"Current Words"} words={currentWords} /></div>
            <div className='main-column action-column' >
                <CounterBox count={count} play={play} setPlay={setPlay} timerStopper={timerStopper} />
                <WriteBox currentWords={currentWords}
                    setCurrentWords={setCurrentWords}
                    setLearntWords={setLearntWords}
                    setCount={setCount}
                    setTimerStopper={setTimerStopper}
                    play={play}
                />
            </div>
            <div className='main-column'>
                <List name={"Words to Learn"} words={wordsToLearn} />
                <List name={"Learnt Words"} words={learntWords} />
            </div>
        </div>
    )
}

export default MainContainer;