import Tile from "../Tile";
import styles from './index.module.scss';

interface Props {
  words?: string;
  answer: string;
}

const TileBoard = ({words, answer}:Props) => {
  const n = 30;
  return (
    <div className={styles.tileBoard}>
      {
        [...Array(n)].map((item, index) => <Tile character={words?.[index] || ''}/>)
      }
    </div>
  );
}

export default TileBoard;