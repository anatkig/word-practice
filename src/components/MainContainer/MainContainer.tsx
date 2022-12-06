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
import localStorageCountLearntToday from '../../logic/localStorageCountLeantToday';


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
    const [availableLearnt, setAvailableLearnt] = useState<StoredData[]>([]);
    const [learntToday, setLearntToday] = useState<number>(0);

    useEffect(() => {
        if (!play) {
            setTimerStopper(600);
        } else if (play) {
            setCount(0);
        }
    }, [play])

    useEffect(() => {
        const learntToday = localStorageRead("learnt-today");
        const currentDate = new Date().getDate();
        if (learntToday && learntToday[0] === currentDate) {
            setLearntToday(learntToday[1]);
        }
    }, [currentWords])

    useEffect(() => {
        if (learntWords.length) {
            const currentSession = Number(localStorage.getItem("session"));
            setAvailableLearnt([...learntWords.filter(word => !word.session || word.session <= currentSession)])
        }
    }, [learntWords])


    useEffect(() => {
        if (!currentWords.length && (wordsToLearn.length || availableLearnt.length || learntWords.length)) {

            const toLearn = wordsToLearn.length >= 5 ? wordsToLearn.slice(0, 5) : wordsToLearn.slice();
            const learnt = availableLearnt.length ?
                (availableLearnt.length >= 5 ? availableLearnt.slice(0, 5) : availableLearnt.slice()) :
                learntWords.length >= 5 ? learntWords.slice(0, 5) :
                    learntWords.slice();

            const current = arrayShuffle([...toLearn, ...learnt]);
            setCurrentWords(current);

        } else if (currentWords.length < 10) {

            const wordLearnt = availableLearnt.length ? availableLearnt[0] : learntWords.length ? learntWords[0] : null;
            if (wordLearnt) { wordLearnt.hit = 0; }

            const toLearn = localStorageRead("Words to Learn");
            const wordToLearn = toLearn.length ? toLearn[0] : null;
            if (wordLearnt && wordToLearn) {
                setCurrentWords(prev => arrayShuffle([...prev, wordLearnt, wordToLearn]));
            } else if (wordLearnt) {
                setCurrentWords(prev => arrayShuffle([...prev, wordLearnt]));
            } else if (wordToLearn) {
                setCurrentWords(prev => arrayShuffle([...prev, wordToLearn]));
            }
        }
    }, [wordsToLearn, currentWords, availableLearnt, learntWords]);


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
        const currentWordsToLearn = localStorageRead("Words to Learn");
        if (currentWordsToLearn.length) {
            if (currentWordsToLearn.length > wordsToLearn.length) {
                localStorageCountLearntToday();
                wordsToLearn.length && setLearntToday(prev => prev + 1);
            }
        }
        localStorageWrite(wordsToLearn, "Words to Learn");
    }, [wordsToLearn])
    console.log(wordsToLearn)
    return (
        <div id="main-container">
            <div className='main-column'><List name={"Current Words"} words={currentWords} setCurrentWords={setCurrentWords} /></div>
            <div className='main-column action-column' >
                <CounterBox count={count}
                    play={play}
                    setPlay={setPlay}
                    timerStopper={timerStopper}
                    learntToday={learntToday}
                />
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