import { Dispatch, FunctionComponent, SetStateAction } from "react";
import styles from './HashtagSuggestion.module.css';

interface Props {
  inputValue: string,
  hashtags: (string | never)[],
  currentLine: [number, Dispatch<SetStateAction<number>>],
  isAllowedNonExistingHashtags?: boolean
}

export const HashtagSuggestion: FunctionComponent<Props> = ({ inputValue, hashtags, currentLine: [currentLine, setCurrentLine], isAllowedNonExistingHashtags = false }) => {
  if (inputValue[0] === '#') { inputValue = inputValue.slice(1); }
  if (isAllowedNonExistingHashtags && inputValue.length && !hashtags.includes(inputValue)) { hashtags.unshift(inputValue); }
  
  return (
    <ul className={styles['suggestion-list']}>
      {!hashtags.length
        ? (<li className={styles['no-suggestion']}>{'No hashtags found :<'}</li>)
        : hashtags.slice(0, 10).map((hashtag, index) => (
        <li
          key={index}
          className={styles['suggestion'] + (index === currentLine ? ' ' + styles['suggestion_active'] : '')}
          onMouseOver={() => {
            setCurrentLine(index);
          }}
        >
          {hashtag}
        </li>))}
    </ul>
  );
}