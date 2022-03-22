import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import Key from '../components/Key'
import Keyboard from '../components/Keyboard'
import TileBoard from '../components/TileBoard'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const answer = "story";
  // idea is to store words in a big array or in one string e.g. ['s','t','y','l','e','p','a','p','e','r','o','t','t','e','r']
  const [guessedWords, setGuessedWords] = useState('');
  const [word, setWord] = useState<string>('');
  const [pressCount, setPressCount] = useState(0);

  const handleKeyPress = (character: string) => {
    if(pressCount<=4){
      setWord(prev => prev + character);
      setGuessedWords(prev => prev + character);
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
    if(answer !== word){
      setPressCount(0);
      setWord('');
    }
  }

  useEffect(() => {
    console.log('pressCount', pressCount);
    console.log('word', word);
  }, [word, pressCount]);

  useEffect(() => {
    console.log('guessedWords', guessedWords);
  }, [guessedWords]);

  return (
    <>
      <div style={{ width: 299}}>
        <TileBoard words={guessedWords} answer={answer}/>
      </div>
      <Keyboard handleEnter={handleEnter} handleKeyPress={handleKeyPress} handleDelete={handleDelete}/>
    </>
  );
}

export default Home
