import {
  Dispatch,
  FunctionComponent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import styles from './HashtagSuggestion.module.css';

interface Props {
  inputValue: string;
  hashtags: (string | never)[];
  currentLine: [number, Dispatch<SetStateAction<number>>];
  isAllowedNonExistingHashtags?: boolean;
  coordinates?: DOMRect;
  isStuckedToLeft?: boolean;
}

export const HashtagSuggestion: FunctionComponent<Props> = ({
  inputValue,
  hashtags,
  currentLine: [currentLine, setCurrentLine],
  isAllowedNonExistingHashtags = false,
  coordinates,
  isStuckedToLeft = false,
}) => {
  if (inputValue[0] === '#') {
    inputValue = inputValue.slice(1);
  }
  if (
    isAllowedNonExistingHashtags &&
    inputValue.length &&
    !hashtags.includes(inputValue)
  ) {
    hashtags.unshift(inputValue);
  }

  const listRef: MutableRefObject<null | HTMLUListElement> = useRef(null);
  const suggestionRef: MutableRefObject<null | HTMLLIElement> = useRef(null);

  function scrollList(topCoord: number) {
    if (listRef.current && suggestionRef.current) {
      listRef.current.scrollTo({
        top: topCoord,
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    if (listRef.current && suggestionRef.current) {
      const listCoordinates = listRef.current.getBoundingClientRect();
      const suggestionCoordinates =
        suggestionRef.current.getBoundingClientRect();

      if (listCoordinates.bottom < suggestionCoordinates.bottom) {
        scrollList(
          suggestionRef.current.offsetTop - suggestionRef.current.offsetHeight,
        );
      } else if (listCoordinates.top > suggestionCoordinates.top) {
        scrollList(suggestionRef.current.offsetTop);
      }
    }
  }, [currentLine]);

  return (
    <ul
      ref={listRef}
      className={styles['suggestion-list']}
      style={{
        top: `${(coordinates?.top ?? 0) + (coordinates?.height ?? 0) + 12}px`,
        left: `${isStuckedToLeft ? 20 : (coordinates?.left ?? 0) - 13}px`,
        width: `min(500px, ${
          coordinates?.width
            ? coordinates.width + 26 + 'px'
            : 'calc(100% - 40px)'
        })`,
      }}
    >
      {!hashtags.length ? (
        <li className={styles['no-suggestion']}>{'No hashtags found :<'}</li>
      ) : (
        hashtags.map((hashtag, index) => (
          <li
            key={index}
            className={
              styles['suggestion'] +
              (index === currentLine ? ' ' + styles['suggestion_active'] : '')
            }
            onMouseOver={() => {
              setCurrentLine(index);
            }}
            onClick={() => {
              setCurrentLine(index);
            }}
            ref={index === currentLine ? suggestionRef : null}
          >
            {hashtag}
          </li>
        ))
      )}
    </ul>
  );
};
