import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import Keyboard from '../components/Keyboard'
import { State } from '../components/Tile'
import TileBoard from '../components/TileBoard'
import { WORDS } from '../constants/wordsList'
import styles from './home.module.scss';

export const answer = "story";

const Home: NextPage = () => {

  // possible idea: setGuessedWords would be an array of objects { character: 'A', status: 'correct' }
  // idea is to store words in a big array or in one string e.g. ['s','t','y','l','e','p','a','p','e','r','o','t','t','e','r']
  // const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [guessedWords, setGuessedWords] = useState<{character: string; state: State; isRevealing: boolean; isShake: boolean;}[]>([]);
  const [word, setWord] = useState<string>('');
  const [guessCount, setGuessCount] = useState(0);
  const [isShake, setIsShake] = useState(false);

  const clearIsShake = () => {
    setIsShake(false);
  };
  // solution: to solve the issue of tiles scaling when the word is wrong, then what you can do is
  // separate the animation css and character present css and create a javascript listener
  // to massage the animation to shake and remove it after 350 ms when user inputs a character

  const handleKeyPress = (character: string) => {
    if(word.length<=4){
      setWord(prev => prev + character);
      // setGuessedWords(prev => prev + character);
      setGuessedWords(prev => [...prev, { character: character, state: 'default', isRevealing: false, isShake: false}]);

      return;
    }
  }

  const handleDelete = () => {
    setWord(prev => prev ? prev.slice(0, -1) : prev);
    if(word.length> 0){
      setGuessedWords(prev => prev ? prev.slice(0, -1) : prev);
    }
  }

  const handleEnter = () => {
    if(guessCount===5) return;
    // TODO: if guess count is 6 then user can't do anything and must press another button to restart the game

    // setGuessedWords(prev => [...prev, word]);
    if(!WORDS.includes(word.toLowerCase()) || word.length < 5 || answer !== word.toLowerCase()){
      setIsShake(true);
      alert('wrong word');
      setTimeout(() => {
        clearIsShake();
      }, 250)

      return;
    }
    flipTiles();

    setGuessCount(prev => prev + 1);

    // TODO: add kanye west quotes from api
    // TODO: create alerts
    // TODO: make keys accept color change
    // TODO: add keyboard interaction - done
    alert("you guessed the answer!");
  }

  useEffect(() => {
    console.log('word', word);
    console.log('guessCount', guessCount);
  }, [
    word, guessCount]);

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


  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if(event.key === "Enter"){
        handleEnter();
      }

      if(event.key === "Backspace"){
        handleDelete();
      }

      if (/^[A-Za-z]$/.test(event.key)) {
        handleKeyPress(event.key);
      }

      return;
    }
    document.addEventListener('keyup', listener);
    return () => {
      document.removeEventListener('keyup', listener);
    };
  }, [handleEnter, handleDelete, handleKeyPress]);

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
