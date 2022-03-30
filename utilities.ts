import { answer } from "./pages";

// sample output ['absent','correct','absent','correct','present','present']
export const getGuessStatuses = (guess: string) => {
  const splitGuess = Array.from(guess);
  const splitAnswer = Array.from(answer);
  const guessStatuses: string[] = [];

  splitGuess.forEach((element, index) => {
    if (element === splitAnswer[index]) {
      guessStatuses.push('correct');
    }
    else if(splitAnswer.includes(element)){
      guessStatuses.push('present');
    }
    else if(!splitAnswer.includes(element) || element !== splitAnswer[index]){
      guessStatuses.push('absent');
    }
  });

  return guessStatuses;
}