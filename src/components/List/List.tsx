import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {

        setOpen(!open);

        const input = document.querySelector("#input") as HTMLElement | null;
        input?.focus();

        if (name === "Current Words" && !open) {
            const chosenWordIndex = Number(localStorage.getItem("wordIndex"));

            if (chosenWordIndex >= 0 && chosenWordIndex < words.length) {
                words[chosenWordIndex].hit = Number(words[chosenWordIndex].hit) - 1;
                localStorageWrite(words, "Current Words");

                if (timeout.current) {
                    clearTimeout(timeout.current);
                    timeout.current = null;
                }
                timeout.current = setTimeout(() => setOpen(false), 5000)
            }
        }
    }
    const handldeHotKey = (event: KeyboardEvent) => {
        if (event.metaKey && event.key === "c") {

            handleClick();
        }
    }

    useEffect(() => {
        if (name === "Current Words") {
            window.addEventListener("keydown", handldeHotKey);
        }
        return () => window.removeEventListener("keydown", handldeHotKey);

    })


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