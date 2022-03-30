import clsx from 'clsx';
import styles from './index.module.scss';

export type State = 'default' | 'correct' | 'absent' | 'present';

interface Props {
  state?: State;
  character?: string | void;
  isRevealing?: boolean;
  isShake: boolean;
  row: number;
  [otherProp: string]: any;
  // rowClass: string;
}

const Tile = ({ rowClass, character = '', row, isRevealing, isShake, index, guessCount, state = 'default', ...otherProps }: Props) => {
  const position = index-(row*5);

  return (
    <div className={clsx(
        styles.tile,
        styles[`mod__${state}`],
        isRevealing && styles.mod__tileReveal,
        styles[`${state}`],
        isShake ? styles.mod__tileShake : character && styles.mod__characterAdd
      )}
      style={{ animationDelay: isRevealing ? `${position * 350}ms`: '0ms' }} 
      {...otherProps}
    >
      <div style={{ animationDelay: isRevealing ? `${position * 350}ms`: '0ms' }}>
        {character}
      </div>
    </div>
  );
}

export default Tile;