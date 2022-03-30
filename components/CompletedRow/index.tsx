import React from "react";
import { getGuessStatuses } from "../../utilities";
import Tile, { State } from "../Tile";

interface Props {
  word: string
}

const CompletedRow = ({word}: Props) => {
  const statuses = getGuessStatuses(word);

  return (
    <div>
      {word.split('').map((letter, i) => (
        <Tile key={`${letter}-${i}`} character={letter} state={statuses[i] as State} />
      ))}
    </div>
  );
}

export default CompletedRow;