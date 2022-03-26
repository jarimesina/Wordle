import Tile, { State } from "../Tile";
import styles from './index.module.scss';

interface Props {
  // words?: string;
  words: { character: string, state: State }[];
  answer: string;
  guessCount: number;
}

const TileBoard = ({words, answer, guessCount}:Props) => {
  const n = 30;

  // const determineStatus = (item: string, index: number) => {

  //   if(item !== ''){
  //     return;
  //   }
  //   if (item === answer[index - (guessCount*5)]) {
  //     return 'correct';
  //   }
  //   if (answer.includes(item)) {
  //     return 'present';
  //   }
  //   if (!answer.includes(item)) {
  //     return 'absent';
  //   }

  //   return 'default';
  // }

  return (
    <div className={styles.tileBoard}>
      {
        [...Array(n)].map((item, index) => <Tile 
          state={words ? words?.[index]?.state : 'default'} 
          // character={words?.[index] || ''}
          character={words ? words?.[index]?.character : ''}
        />)
      }
    </div>
  );
}

export default TileBoard;