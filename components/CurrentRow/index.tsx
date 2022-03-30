import Tile from "../Tile";
import styles from './index.module.scss';

interface Props {
  guess: string;
}

const CurrentRow = ({guess}:Props) => {
  const splitGuess = guess.split("");

  console.log(splitGuess);
  return (
    <div className={styles.currentRow}>
      {guess.split("").map((letter, i) => (
        <Tile key={`${letter}-${i}`} character={letter} />
      ))}
    </div>
  );
}

export default CurrentRow;