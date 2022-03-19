import styles from './index.module.scss';
import Image, { ImageProps } from 'next/image';
import { BackSpace } from '../../assets/images';

interface Props {
  character?: string;
  svg?: ImageProps['src'];
  [otherProp: string]: any;
}

const Key = ({ character, svg, ...otherProps }: Props) => {

  // TODO: make this accept children
  return (
    <button className={styles.key} {...otherProps}>
      {character ? character :
      <div className={styles.key__imageWrapper}>
        <Image src={svg || BackSpace} layout="fill" objectFit="cover" />
      </div>}
    </button>
  );
}

export default Key;