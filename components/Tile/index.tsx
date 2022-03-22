import clsx from 'clsx';
import styles from './index.module.scss';

type State = 'default' | 'correct' | 'absent' | 'present';

interface Props {
  state?: State;
  character?: string | void;
  [otherProp: string]: any;
}

const Tile = ({ character = '', state = 'default', ...otherProps }: Props) => {
  return (
    <div className={clsx(styles.tile, styles[`mod__${state}`])} {...otherProps}>
      {character}
    </div>
  );
}

export default Tile;