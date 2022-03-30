import React from "react";
import Tile from "../Tile";
import styles from './index.module.scss';

interface Props {
  key: number;
}

const EmptyRow = ({ key }: Props) => {
  const emptyCells = Array.from(Array(5))

  return (
    <div className={styles.emptyRow}>
      {emptyCells.map((_, index) => (
        <div className={styles.emptyRow__tileWrapper}>
          <Tile key={index} />
        </div>
      ))}
    </div>
  );
}

export default EmptyRow;