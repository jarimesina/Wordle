import { useAnimation } from 'framer-motion'
import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import Key from '../components/Key'
import Keyboard from '../components/Keyboard'
import { State } from '../components/Tile'
import TileBoard from '../components/TileBoard'
import styles from '../styles/Home.module.css'

export const answer = "story";

const Home: NextPage = () => {

  // possible idea: setGuessedWords would be an array of objects { character: 'A', status: 'correct' }
  // idea is to store words in a big array or in one string e.g. ['s','t','y','l','e','p','a','p','e','r','o','t','t','e','r']
  // const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [guessedWords, setGuessedWords] = useState<{character: string; state: State; isRevealing: boolean}[]>([]);
  const [word, setWord] = useState<string>('');
  const [pressCount, setPressCount] = useState(0);
  const [guessCount, setGuessCount] = useState(0);

  const handleKeyPress = (character: string) => {
    if(pressCount<=4){
      setWord(prev => prev + character);
      // setGuessedWords(prev => prev + character);
      setGuessedWords(prev => [...prev, { character: character, state: 'default', isRevealing: false}]);
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
    // every time the user presses enter, count the number of guesses

    // setGuessedWords(prev => [...prev, word]);
    flipKeys();
    setGuessCount(prev => prev + 1);
    if(answer !== word.toLowerCase()){
      setPressCount(0);
      setWord('');
      return;
    }

    // TODO: add kanye west quotes from api
    // TODO: create component for guessing the correct answer
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

  // two problems: 
  // 1. it does not animate in a staggered manner
  // 2. the flip should happen first before adding the color
  // solution: index - guesscount times 5 will be the delay value

  // this method will set the status on the active row which will cause the tile to flip and change color
  const flipKeys = useCallback(() => {
    for (let i = 0; i < 5; i++) {
      guessedWords[guessCount*5 + i].isRevealing = true;
      // console.log(guessedWords[guessCount*5 + i].isRevealing);
      // guessedWords[guessCount*5 + i].animate = "flip"
      // solution for the color problem: set a property on update so that when the animation happens, we set the state on the tile
      guessedWords[guessCount*5 + i].state = determineStatus(guessedWords[guessCount*5 + i].character.toLowerCase(), guessCount*5 + i);
    }
  },[guessedWords]);

  return (
    <>
      <div style={{ width: 299}}>
        <TileBoard guessCount={guessCount} words={guessedWords} answer={answer} word={word}/>
      </div>
      <Keyboard handleEnter={handleEnter} handleKeyPress={handleKeyPress} handleDelete={handleDelete}/>
    </>
  );
}

export default Home
