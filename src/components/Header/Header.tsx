import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StoredData } from '../../types/types';
import inputValueParse from '../../logic/inputValueParse';
import './header.css';

const Header = ({ setNewWords, setPlay, play }:
    { setNewWords: Dispatch<SetStateAction<StoredData[]>>, setPlay: Dispatch<SetStateAction<boolean>>, play: boolean }) => {

    const [inputValue, setInputValue] = useState<string>();
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [startRestart, setStartRestart] = useState("Start");

    useEffect(() => {
        if (play) {
            setStartRestart("Stop");
        }
        else {
            setStartRestart("Start");
        }
    }, [play])

    const handleAddButton = () => {
        setIsInputOpen(!isInputOpen);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = () => {
        if (inputValue) {
            setIsInputOpen(false);
            setNewWords(inputValueParse(inputValue));
            setInputValue("");
        }
    }
    const handleStart = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (startRestart === "Start") {
            setPlay(true);
            setStartRestart("Stop");
        } else {
            setPlay(false);
        }
    }
    window.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            handleStart()
        }
    })

    return (
        <div id="header">

            <button className='header-button start' onClick={handleStart}>{startRestart}</button>
            <button className='header-button' onClick={handleAddButton}>Add New Words</button>

            {isInputOpen &&
                <div>
                    <input id="input" autoComplete="off" placeholder='Put your words here' value={inputValue} onChange={handleChange} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>}
        </div>
    )
}

export default Header;