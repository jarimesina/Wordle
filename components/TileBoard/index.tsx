import { motion } from "framer-motion";
import React from "react";
import CompletedRow from "../CompletedRow";
import CurrentRow from "../CurrentRow";
import EmptyRow from "../EmptyRow";
import Tile, { State } from "../Tile";
import styles from './index.module.scss';

interface Props {
  // words?: string;
  word: string;
  words: { character: string, state: State, isRevealing: boolean}[];
  // words: string[];
  answer: string;
  guessCount: number;
}

const TileBoard = ({word, words, answer, guessCount}:Props) => {
  const n = 30;
  const empties =
    words.length < 5
      ? Array.from(Array(5 - words.length))
      : []

  const determineRow = (index: number) => {
    if(index > 0 && index<5){
      return 0;
    }
    else if(index >= 5 && index<10){
      return 1;
    }
    else if(index >= 10 && index<15){
      return 2;
    }
    else if(index >= 15 && index<20){
      return 3;
    }
    else if(index >= 20 && index<25){
      return 4;
    }

    return 0;
  };

  return (
    // <>
    //   <CompletedRow word={word}/>

    //   {words.length < 5 && (
    //     <CurrentRow guess={word} />
    //   )}

    //   {empties.map((_, index) => (
    //     <EmptyRow key={index} />
    //   ))}
    // </>

    <div
      className={styles.tileBoard}>
      {
        [...Array(n)].map((item, index) => {
            return (
              <Tile
                isRevealing={words ? words?.[index]?.isRevealing : false}
                key={`${words?.[index]?.character}-${index}`}
                state={words ? words?.[index]?.state : 'default'} 
                character={words ? words?.[index]?.character : ''}
                index={index}
                row = {determineRow(index)}
                guessCount={guessCount-1}
              />
            );
          }
        )
      }
    </div>
  );
}

export default TileBoard;