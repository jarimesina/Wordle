import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import Keyboard from '../components/Keyboard'
import { State } from '../components/Tile'
import TileBoard from '../components/TileBoard'
import { WORDS } from '../constants/wordsList'
import styles from './index.module.scss';

export const answer = "story";

const Home: NextPage = () => {

  // possible idea: setGuessedWords would be an array of objects { character: 'A', status: 'correct' }
  // idea is to store words in a big array or in one string e.g. ['s','t','y','l','e','p','a','p','e','r','o','t','t','e','r']
  // const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [guessedWords, setGuessedWords] = useState<{character: string; state: State; isRevealing: boolean; isShake: boolean;}[]>([]);
  const [word, setWord] = useState<string>('');
  const [pressCount, setPressCount] = useState(0);
  const [guessCount, setGuessCount] = useState(0);
  const [isShake, setIsShake] = useState(false);

  const clearIsShake = () => {
    setIsShake(false);
  };

  const handleKeyPress = (character: string) => {
    if(pressCount<=4){
      setWord(prev => prev + character);
      // setGuessedWords(prev => prev + character);
      setGuessedWords(prev => [...prev, { character: character, state: 'default', isRevealing: false, isShake: false}]);
      setPressCount(prev => prev + 1);

      return;
    }
  }

  const handleDelete = () => {
    setWord(prev => prev ? prev.slice(0, -1) : prev);

    if(pressCount>0){
      setGuessedWords(prev => prev ? prev.slice(0, -1) : prev);
    }

    if(word){
      setPressCount(prev => prev - 1);
    }
  }

  const handleEnter = () => {
    if(guessCount===5) return;
    // TODO: if guess count is 6 then user can't do anything and must press another button to restart the game

    // setGuessedWords(prev => [...prev, word]);
    if(!WORDS.includes(word.toLowerCase()) || word.length < 5){
      setIsShake(true);
      alert('wrong word');
      setTimeout(() => {
        clearIsShake();
      }, 250)

      return;
    }
    flipTiles();

    setGuessCount(prev => prev + 1);
    if(answer !== word.toLowerCase()){
      setPressCount(0);
      setWord('');
      return;
    }

    // TODO: add kanye west quotes from api
    // TODO: create alerts
    // TODO: make keys accept color change
    // TODO: add keyboard interaction
    alert("you guessed the answer!");
  }

  useEffect(() => {
    console.log('pressCount', pressCount);
    console.log('word', word);
    console.log('guessCount', guessCount);
  }, [word, pressCount, guessCount]);

  useEffect(() => {
    console.log('guessedWords', guessedWords);
  }, [guessedWords]);

  const determineStatus = (item: string, index: number) => {

    // if(item !== ''){
    //   return 'default';
    // }
    if (item === answer[index - (guessCount*5)]) {
      return 'correct';
    }
    if (answer.includes(item)) {
      return 'present';
    }
    if (!answer.includes(item)) {
      return 'absent';
    }

    return 'correct';
  }

  // this method will set the status on the active row which will cause the tile to flip and change color
  const flipTiles = useCallback(() => {
    for (let i = 0; i < 5; i++) {
      guessedWords[guessCount*5 + i].isRevealing = true;
      guessedWords[guessCount*5 + i].state = determineStatus(guessedWords[guessCount*5 + i].character.toLowerCase(), guessCount*5 + i);
    }
  },[guessedWords]);

  return (
    <div className={styles.home}>
      <div style={{ width: 299}}>
        <TileBoard isShake={isShake} guessCount={guessCount} words={guessedWords} answer={answer} word={word}/>
      </div>
      <Keyboard handleEnter={handleEnter} handleKeyPress={handleKeyPress} handleDelete={handleDelete}/>
    </div>
  );
}

export default Home
