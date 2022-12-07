import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import createRandomWordAndAswer from '../../logic/createRandomWordAndAswer';
import { StoredData } from '../../types/types';
import './write-box.css';

const WriteBox = ({ currentWords, setCurrentWords, setLearntWords, setCount, setTimerStopper, play }:
    {
        currentWords: StoredData[],
        setCurrentWords: Dispatch<SetStateAction<StoredData[]>>,
        setLearntWords: Dispatch<SetStateAction<StoredData[]>>,
        setCount: Dispatch<SetStateAction<number>>,
        setTimerStopper: Dispatch<SetStateAction<number>>,
        play: boolean
    }) => {

    const [inputValue, setInputValue] = useState<string>("");
    const [word, setWord] = useState<string>();
    const [answer, setAnswer] = useState<string>();
    const [wordIndex, setWordIndex] = useState<number>();

    useEffect(() => {
        if (!play) {
            setInputValue("");
        }
    }, [play])

    useEffect(() => {
        if (currentWords.length) {
            const [word, answer, randomIndex] = createRandomWordAndAswer(currentWords);
            setWord(word as string);
            setAnswer(answer as string);
            setWordIndex(randomIndex as number);
        }
    }, [currentWords])

    useEffect(() => {
        if (word) {
            const currentSession = localStorage.getItem("session");
            if (currentSession) {
                localStorage.setItem("session", String(Number(currentSession) + 1))
            } else {
                localStorage.setItem("session", String(0))
            }
        }


    }, [word])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {

        const current = event.target.value;

        setInputValue(current);

        const currentArr = current.split(" ");
        const answerArr = answer?.split(" ");

        if (current.length === answer?.length
            && currentArr.every(word => answerArr?.includes(word))
            && answerArr?.every(word => currentArr.includes(word))
        ) {
            setCount(prev => prev + 1);
            setTimerStopper(prev => { return Math.floor(prev - prev / 40) });
            setInputValue("");
            const currentUnit = currentWords[wordIndex as number];

            if (currentUnit.hit >= (4 + Math.round(currentUnit.gu.length / 8))) {
                setCurrentWords((prev: StoredData[]) => [...prev.filter((unit: StoredData, index: number) => index !== wordIndex)]);

                if (currentUnit.step && currentUnit.session) {
                    const step = Math.floor(currentUnit.step * 1.5);
                    const session = currentUnit.session + step;
                    currentUnit.session = session;
                    currentUnit.step = step;
                } else {
                    const currentSession = Number(localStorage.getItem("session"));
                    const step = 30;
                    currentUnit.session = currentSession + step;
                    currentUnit.step = step;
                }
                setLearntWords(prev => [...prev, currentUnit]);
            } else {
                const curWords = [...currentWords];
                curWords[wordIndex as number].hit = curWords[wordIndex as number].hit + 1;
                setCurrentWords([...curWords]);
            }
        }
    }
    return (
        <div id="write-box">
            {play ?
                <div id="inner-box">
                    <h1 id="head-word">{word}</h1>
                    <input id="input" autoComplete="off" onChange={handleInput} value={inputValue} autoFocus />
                </div> : <h1>Press Start</h1>
            }
        </div>
    )
}

export default WriteBox;