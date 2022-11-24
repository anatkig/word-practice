import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';
import './App.css';
import localStorageRead from './logic/localStorageRead';
import localStorageLoad from './logic/localStorageLoad';
import { StoredData } from './types/types';

function App() {

  const [newWords, setNewWords] = useState<StoredData[]>([]);
  const [wordsToLearn, setWordsToLearn] = useState(localStorageRead("Words to Learn"));
  const [play, setPlay] = useState(false);


  useEffect(() => {
    if (newWords) {
      localStorageLoad(newWords);
      setWordsToLearn(localStorageRead("Words to Learn"));
    }
  }, [newWords])

  return (
    <div className="App">
      <Header setNewWords={setNewWords} play={play} setPlay={setPlay} />
      <MainContainer wordsToLearn={wordsToLearn} setWordsToLearn={setWordsToLearn} play={play} setPlay={setPlay} />
    </div>
  );
}

export default App;
