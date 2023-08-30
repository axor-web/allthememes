import { Dispatch, FunctionComponent, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { HashtagSuggestion } from "../HashtagSuggestion/HashtagSuggestion";
import inputStyles from '../../styles/input.module.css';
import styles from './HashtagInput.module.css';
import { WarningMessage } from "../WarningMessage/WarningMessage";

interface Props {
  hashtagsState: [Set<string|never>, Dispatch<SetStateAction<Set<string>>>],
  allHashtags: (string|never)[],
  disabled?: boolean,
  isAllowedNonExistingHashtags?: boolean
}

export const HashtagInput: FunctionComponent<Props> = ({ hashtagsState: [addedHashtags, setAddedHashtags], allHashtags, disabled = false, isAllowedNonExistingHashtags = false }) => {
  const [rerender, setRerender] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentLine, setCurrentLineRaw] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const setCurrentLine = (lineNumber: number) => {
    if (lineNumber < 0) { lineNumber = allHashtags.length - 1; }
    else if (lineNumber >= allHashtags.length) { lineNumber = 0; }

    setCurrentLineRaw(lineNumber);
  };

  const input: MutableRefObject<null | HTMLInputElement> = useRef(null);

  useEffect(() => {
    document.body.onscroll = () => setIsInputActive(false);
    document.body.onclick = (event) => {
      setCurrentLine(0);
      if (event.target instanceof HTMLElement && event.target.className.includes('suggestion') && !event.target.className.includes('suggestion-list')) {
        if (isAllowedNonExistingHashtags && currentLine === 0) {
          addHashtag(event.target.innerText);
        }
        else if (allHashtags.length && currentLine < allHashtags.length) {
          addHashtag(allHashtags[currentLine]);
        }

        setIsInputActive(false);
      }
      
      else if (event.target !== input.current) {
        setIsInputActive(false);
      }
    }
  });

  allHashtags.sort();
  allHashtags = allHashtags.filter((hashtag) => !addedHashtags.has(hashtag) && hashtag.includes(inputValue[0] === '#' ? inputValue.slice(1) : inputValue));
  
  function addHashtag(hashtag: string) {
    addedHashtags.add(hashtag);

    setAddedHashtags(addedHashtags);
    setRerender(!rerender);

    if (input.current?.value) {
      input.current.value = '';
      setInputValue('');
    }
  }

  return (
    <div className={
      inputStyles.input 
      + ' ' + styles['outer-input']
      + (disabled ? ' ' + inputStyles['input_disabled'] + ' ' + styles['outer-input_disabled'] : '')
      + (isInputActive ? ' ' + styles['outer-input_active'] : '')
      + (isInvalid ? ' ' + inputStyles.input_invalid : '')
    }>
      {[...addedHashtags].map((addedHashtag, index) => 
        <div key={index} className={styles.hashtag}>
          {'#' + addedHashtag}
          <button 
            className={styles.deletebutton}
            onClick={(event) => {
              event.preventDefault();
              addedHashtags.delete(addedHashtag);
              setAddedHashtags(addedHashtags);
              setRerender(!rerender);
            }}
          >
            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.000976562" y="58.353" width="82.5235" height="5.15772" rx="2.57886" transform="rotate(-45 0.000976562 58.353)" fill="white"/>
              <rect x="3.64746" y="6.10352e-05" width="82.5235" height="5.15772" rx="2.57886" transform="rotate(45 3.64746 6.10352e-05)" fill="white"/>
            </svg>
          </button>
        </div>
      )}

      <input
        ref = {input}
        type='text'
        className={styles.input}
        placeholder={'Start typing hashtag name...'}
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInvalid(false)}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          setCurrentLine(0);
          setIsInvalid(false);

          if (event.code === 'Enter' || event.code === 'Tab') {
            event.preventDefault();

            let string = event.currentTarget.value;
            if (string[0] === '#') { string = string.slice(1); }

            if (isAllowedNonExistingHashtags && currentLine === 0) {
              addHashtag(string)
            }
            else if (allHashtags.length && currentLine < allHashtags.length) {
              addHashtag(allHashtags[currentLine]);
            }
          }

          else if (event.code === 'Backspace') {
            if (addedHashtags.size && !event.currentTarget.value) {
              const addedHashtagsCopy = [...addedHashtags];
              addedHashtagsCopy.pop();

              setAddedHashtags(new Set(addedHashtagsCopy));
            }
          }

          else if (event.code === 'ArrowUp' || event.code === 'ArrowLeft') {
            event.preventDefault();
            setCurrentLine(currentLine - 1);
          }
          else if (event.code === 'ArrowDown' || event.code === 'ArrowRight') {
            event.preventDefault();
            setCurrentLine(currentLine + 1)
          }

          else if (/[A-Z]/.test(event.key) && event.key.length === 1) {
            event.preventDefault();

            const lowerCaseLetter = event.key.toLowerCase();
            event.currentTarget.value += lowerCaseLetter;

            setInputValue(event.currentTarget.value);
          }

          else if (!(event.currentTarget.value.length === 0 && event.key === '#') && !/^[a-z0-9]+$/.test(event.key) && event.key.length === 1) {
            event.preventDefault();
            setIsInvalid(true);
          }
        }}
      />

      { isInputActive &&
        <HashtagSuggestion
          isAllowedNonExistingHashtags={isAllowedNonExistingHashtags}
          inputValue={inputValue}
          hashtags={allHashtags}
          currentLine={[currentLine, setCurrentLineRaw]}
        ></HashtagSuggestion>
      }
      
      { isInputActive && isInvalid &&
        <WarningMessage></WarningMessage> }
    </div>
  );
}