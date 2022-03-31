import styles from './index.module.scss';
import Image, { ImageProps } from 'next/image';
import { BackSpace } from '../../assets/images';
import { State } from '../Tile';
import clsx from 'clsx';

interface Props {
  status?: State;
  character?: string;
  svg?: ImageProps['src'];
  handleKeyPress?: (val: string) => void;
  handleDelete?: () => void;
  handleEnter?: () => void;
  [otherProp: string]: any;
}

const Key = ({ status="default", character, svg, handleEnter, handleKeyPress, handleDelete, ...otherProps }: Props) => {

  // TODO: make this accept children
  return (
    <button className={clsx(styles.key, styles[`mod__${status}`])} {...otherProps} onClick={() => {
      if(handleKeyPress && character){
        handleKeyPress(character)
      }

      if(handleDelete){
        handleDelete();
      }

      if(handleEnter){
        handleEnter();
      }
    }}>
      {character ? character :
      <div className={styles.key__imageWrapper}>
        <Image src={svg || BackSpace} layout="fill" objectFit="cover" />
      </div>}
    </button>
  );
}

export default Key;