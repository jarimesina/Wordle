import clsx from 'clsx';
import styles from './index.module.scss';

export type State = 'default' | 'correct' | 'absent' | 'present';

interface Props {
  state?: State;
  character?: string | void;
  isRevealing?: boolean;
  isShake: boolean;
  isDance?: boolean;
  row: number;
  [otherProp: string]: any;
}

const Tile = ({isDance, isScale, character = '', row, isRevealing, isShake, index, guessCount, state = 'default', ...otherProps }: Props) => {
  const position = index-(row*5);

  return (
    <div className={clsx(
        styles.tile,
        isShake && styles.mod__tileShake,
        isDance && styles.mod__tileDance,
      )}
      style={{ animationDelay: isDance ? `${position * 150}ms`: '0ms' }} 
      {...otherProps}
    >
      <div className={clsx(styles.tile__inner, 
          styles[`mod__${state}`],
          isRevealing && styles.mod__tileReveal,
          styles[`${state}`],
          isScale && styles.mod__tileCharacterAdd,
          character && styles.mod__hasValue,
        )}
        style={{ animationDelay: isRevealing ? `${position * 350}ms`: '0ms' }}>
        <div style={{ animationDelay: isRevealing ? `${position * 350}ms`: '0ms' }}>
          {character}
        </div>
      </div>
    </div>
  );
}

export default Tile;