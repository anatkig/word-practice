import React, { Dispatch, SetStateAction, useState } from 'react';
import { StoredData } from '../../types/types';
import inputValueParse from '../../logic/inputValueParse';
import './header.css';

const Header = ({ setNewWords }: { setNewWords: Dispatch<SetStateAction<StoredData[]>> }) => {

    const [inputValue, setInputValue] = useState<string>();
    const [isInputOpen, setIsInputOpen] = useState(false);

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
        }
    }

    return (
        <div id="header">

            <button id="add-new-words" onClick={handleAddButton}>Add New Words</button>

            {isInputOpen &&
                <div>
                    <input id="input" placeholder='Put your words here' value={inputValue} onChange={handleChange} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>}
        </div>
    )
}

export default Header;