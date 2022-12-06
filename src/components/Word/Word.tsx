import { Dispatch, SetStateAction } from 'react';
import { StoredData } from '../../types/types';
import './word.css';

const Word = ({ word, hit, index, setCurrentWords }:
    {
        word: StoredData, hit: boolean, index: number, setCurrentWords?: Dispatch<SetStateAction<StoredData[]>>,
    }) => {

    const handleDelete = (word: string) => {
        setCurrentWords && setCurrentWords(prev => prev.filter((wordObj: StoredData) => wordObj.gu === word));
    }

    return (
        <>
            <div id="word">
                {`${index}). ${word.ru} - ${word.gu} ${hit ? ' - ' + word.hit : ''}`}
            </div>
            <div id="delete" onClick={() => handleDelete(word.gu)}>Delete</div>
        </>
    )
}

export default Word;