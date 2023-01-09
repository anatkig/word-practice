import React, { Dispatch, SetStateAction, useState } from "react";
import { StoredData } from "../../types/types";
import localStorageWrite from "../../logic/localStorageWrite";
import Word from "../Word/Word";
import './list.css';


const List = ({ name, words, setCurrentWords }:
    {
        name: string,
        words: StoredData[],
        setCurrentWords?: Dispatch<SetStateAction<StoredData[]>>,
    }) => {

    const [open, setOpen] = useState(name === "Current Words" ? false : true);

    const handleClick = () => {
        setOpen(!open);
        const chosenWordIndex = Number(localStorage.getItem("wordIndex"));

        if (chosenWordIndex) {
            words[chosenWordIndex].hit = words[chosenWordIndex].hit - 1;
            localStorageWrite(words, "Current Words");
        }
    }

    return (
        <div id="list">
            <h3 id="name" onClick={handleClick}>{name}</h3>
            {open && <div id="word-container">
                {words.map((word, index) =>
                    <Word key={`${word.gu}${index}`} word={word} hit={name === "Current Words" ? true : false}
                        index={index}
                        setCurrentWords={setCurrentWords}
                    />)}
            </div>}
        </div>
    )
}

export default List;