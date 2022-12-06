import React, { Dispatch, SetStateAction } from "react";
import { StoredData } from "../../types/types";
import Word from "../Word/Word";
import './list.css';


const List = ({ name, words, setCurrentWords }: { name: string, words: StoredData[], setCurrentWords?: Dispatch<SetStateAction<StoredData[]>>, }) => {

    return (
        <div id="list">
            <h3 id="name">{name}</h3>
            <div id="word-container">
                {words.map((word, index) =>
                    <Word key={`${word.gu}${index}`} word={word} hit={name === "Current Words" ? true : false}
                        index={index}
                        setCurrentWords={setCurrentWords}
                    />)}
            </div>
        </div>
    )
}

export default List;