import clsx from 'clsx';
import styles from './index.module.scss';

export type State = 'default' | 'correct' | 'absent' | 'present';

interface Props {
  state?: State;
  character?: string | void;
  [otherProp: string]: any;
}

const Tile = ({ character = '', state = 'default', ...otherProps }: Props) => {
  return (
    // TODO: add state for tiles as a row if active, passed, not yet passed
    <div className={clsx(styles.tile, styles[`mod__${state}`])} {...otherProps}>
      {character}
    </div>
  );
}

export default Tile;