import { BackSpace } from "../../assets/images";
import Key from "../Key";
import styles from './index.module.scss';

interface Props {
  handleKeyPress: (val: string) => void;
  handleDelete: () => void;
  handleEnter: () => void;
}

const Keyboard = ({handleKeyPress, handleDelete, handleEnter}:Props) => {
  const row1 = ['Q','W','E','R','T','U','I','O','P'];
  const row2 = ['A','S','D','F','G','H','I','J','K','L'];
  const row3 = ['Z','X','C','V','B','N','M'];

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboard__row}>
        {
          row1.map((item, index) => (
            <Key key={`${item}-${index}`} character={item} handleKeyPress={handleKeyPress}/>
          ))
        }
      </div>
      <div className={styles.keyboard__row}>
        <div style={{flex: 0.5}}></div>
        {
          row2.map((item, index) => (
            <Key key={`${item}-${index}`} character={item} handleKeyPress={handleKeyPress}/>
          ))
        }
        <div style={{flex: 0.5}}></div>
      </div>
      <div className={styles.keyboard__row}>
        <Key character="enter" style={{flex: 1.5, fontSize: 12}} handleEnter={handleEnter}/>
        {
          row3.map((item, index) => (
            <Key key={`${item}-${index}`} character={item} handleKeyPress={handleKeyPress}/>
          ))
        }
        <Key svg={BackSpace} style={{flex: 1.5, fontSize: 12}} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default Keyboard;