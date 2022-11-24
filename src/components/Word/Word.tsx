import { StoredData } from '../../types/types';
import './word.css';

const Word = ({ word, hit, index }: { word: StoredData, hit: boolean, index: number }) => {
    return (
        <div id="word">
            {`${index}). ${word.ru} - ${word.gu} ${hit ? ' - ' + word.hit : ''}`}
        </div>
    )
}

export default Word;