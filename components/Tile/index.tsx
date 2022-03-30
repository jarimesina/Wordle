import clsx from 'clsx';
import styles from './index.module.scss';
// import { motion, ResolvedValues, transform } from "framer-motion"

export type State = 'default' | 'correct' | 'absent' | 'present';

interface Props {
  state?: State;
  character?: string | void;
  isRevealing?: boolean;
  row: number;
  [otherProp: string]: any;
}

const Tile = ({ character = '', row, isRevealing, index, guessCount, state = 'default', ...otherProps }: Props) => {

  const position = index-((row)*5);
  return (
    // TODO: add state for tiles as a row if active, passed, not yet passed
    // <div className={clsx(styles.tile, isRevealing && styles.mod__tileReveal, styles[`mod__${state}`])} style={{ animationDelay }} {...otherProps}>
    <div className={clsx(styles.tile, styles[`mod__${state}`], isRevealing && styles.mod__tileReveal, styles[`${state}`])} style={{ animationDelay: `${position * 350}ms` }} {...otherProps}>
      {character}
    </div>
  );
}

export default Tile;