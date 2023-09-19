'use client';

import { Dispatch, FunctionComponent, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { HashtagSuggestion } from "../HashtagSuggestion/HashtagSuggestion";
import { WarningMessage } from "../WarningMessage/WarningMessage";
import { createPortal } from "react-dom";
import classNames from "classnames";
import inputStyles from '../../styles/input.module.css';
import styles from './HashtagInput.module.css';
import { useDispatch, useSelector } from "react-redux";
import { hashtagActions, selectIsHashtagsWarning, selectHashtagWarningMessage } from "@/redux/features/hashtags";

interface Props {
  addedHashtagsRef: MutableRefObject<Set<string | never>>,
  allHashtags: (string | never)[],
  disabled?: boolean,
  isAllowedNonExistingHashtags?: boolean,
  size?: 'slim' | 'wide',
}

export const HashtagInput: FunctionComponent<Props> = ({ addedHashtagsRef, allHashtags, disabled = false, isAllowedNonExistingHashtags = false, size = 'slim' }) => {
  const [addedHashtags, setAddedHashtagsRaw] = useState(addedHashtagsRef.current);
  const setAddedHashtags = useCallback((hashtags: Set<string | never>) => {
    setAddedHashtagsRaw(hashtags);
    addedHashtagsRef.current = hashtags;
  }, [addedHashtagsRef]);
  
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [inputCoordinates, setInputCoordinates]: [DOMRect | undefined, Dispatch<SetStateAction<undefined | DOMRect>>] = useState();
  
  const isWarning = useSelector(selectIsHashtagsWarning);
  const warningMessage = useSelector(selectHashtagWarningMessage);

  allHashtags.sort();
  allHashtags = allHashtags.filter((hashtag) => !addedHashtags.has(hashtag) && hashtag.indexOf(inputValue[0] === '#' ? inputValue.slice(1) : inputValue) === 0);

  const [currentLine, setCurrentLineRaw] = useState(0);

  const setCurrentLine = useCallback((lineNumber: number) => {
    if (lineNumber < 0) { lineNumber = allHashtags.length - 1; }
    else if (lineNumber >= allHashtags.length) { lineNumber = 0; }

    setCurrentLineRaw(lineNumber);
  }, [allHashtags.length]);

  const input: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const [isInputActive, setIsInputActiveRaw] = useState(false);
  const setIsInputActive = (isActive: boolean) => {
    setIsInputActiveRaw(isActive);
    if (input.current) {
      if (isActive) {
        input.current.focus();
      }
      else {
        input.current.blur();
      }
    }
  }

  const addHashtag = useCallback((hashtag: string) => {
    addedHashtags.add(hashtag);

    setAddedHashtags(new Set(addedHashtags));

    if (input.current?.value) {
      input.current.value = '';
      setInputValue('');
    }
  }, [addedHashtags, setAddedHashtags]);

  useEffect(() => {
    if (input.current) {
      setInputCoordinates(input.current.getBoundingClientRect());
    }
  }, [inputValue, addedHashtags.size, allHashtags.length]);

  useEffect(() => {
    function scrollOrResizeHandler() {
      setIsInputActive(false);
      
      if (input.current) {
        setInputCoordinates(input.current.getBoundingClientRect());
      }
    }

    function clickHandler(event: Event) {
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

    document.addEventListener('scroll', scrollOrResizeHandler);
    window.addEventListener('resize', scrollOrResizeHandler);
    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('scroll', scrollOrResizeHandler);
      window.removeEventListener('resize', scrollOrResizeHandler);
      document.removeEventListener('click', clickHandler);
    }
  }, [addHashtag, allHashtags, currentLine, isAllowedNonExistingHashtags, setCurrentLine])

  return (
    <div className={classNames(
      inputStyles.input,
      styles['outer-input'],
      disabled ? inputStyles['input_disabled'] + ' ' + styles['outer-input_disabled'] : '',
      isInputActive ? styles['outer-input_active'] : '',
      isWarning ? inputStyles.input_invalid : '',
      size === 'wide' ? styles['outer-input_wide'] : ''
    )}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          input.current?.focus();
        }
      }}
    >
      {[...addedHashtags].map((addedHashtag, index) => 
        <div key={index} className={styles.hashtag}>
          {'#' + addedHashtag}
          <button 
            className={styles.deletebutton}
            onClick={(event) => {
              event.preventDefault();
              addedHashtags.delete(addedHashtag);
              setAddedHashtags(new Set(addedHashtags));
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
        onFocus={() => {
          dispatch(hashtagActions.setIsWarning(false));
          setIsInputActive(true);
        }}
        onBlur={() => {
          dispatch(hashtagActions.setIsWarning(false));
        }}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          setCurrentLine(0);
          dispatch(hashtagActions.setIsWarning(false));

          if (event.code === 'Enter' || event.code === 'Tab') {
            event.preventDefault();

            let string = event.currentTarget.value;
            if (string[0] === '#') { string = string.slice(1); }

            if (isAllowedNonExistingHashtags && currentLine === 0 && string.length > 0) {
              addHashtag(string);
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
          }

          else if (!(event.currentTarget.value.length === 0 && event.key === '#') && !/^[a-z0-9]+$/.test(event.key) && event.key.length === 1) {
            event.preventDefault();
            dispatch(hashtagActions.setIsWarning(true));
          }
        }}
      />

      { isInputActive &&
        createPortal(
        <HashtagSuggestion
          isAllowedNonExistingHashtags={isAllowedNonExistingHashtags}
          inputValue={inputValue}
          hashtags={allHashtags}
          currentLine={[currentLine, setCurrentLineRaw]}
          coordinates={inputCoordinates}
          isStuckedToLeft={size === 'slim'}
        ></HashtagSuggestion>
        , document.body)
      }
      
      { (isInputActive || warningMessage) && isWarning &&
        <WarningMessage message={warningMessage}></WarningMessage> }
    </div>
  );
}