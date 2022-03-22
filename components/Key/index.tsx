import styles from './index.module.scss';
import Image, { ImageProps } from 'next/image';
import { BackSpace } from '../../assets/images';

interface Props {
  character?: string;
  svg?: ImageProps['src'];
  handleKeyPress?: (val: string) => void;
  handleDelete?: () => void;
  handleEnter?: () => void;
  [otherProp: string]: any;
}

const Key = ({ character, svg, handleEnter, handleKeyPress, handleDelete, ...otherProps }: Props) => {

  // TODO: make this accept children
  return (
    <button className={styles.key} {...otherProps} onClick={() => {
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