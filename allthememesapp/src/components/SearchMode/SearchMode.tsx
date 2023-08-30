'use client'

import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Hint } from "../Hint/Hint";
import styles from './SearchMode.module.css';

interface Label {
  text: string,
  hint?: string
}
interface Props {
  leftLabel?: Label,
  rightLabel?: Label,
  modeState: [boolean, Dispatch<SetStateAction<boolean>>]
}

export const SearchMode: FunctionComponent<Props> = ({
  leftLabel = { text: 'Hashtag Mode' },
  rightLabel = { text: 'ChatGPT Query Mode', hint: 'Enter a query for ChatGPT, which analyzes it and selects hashtags.'},
  modeState: [mode, setMode]
}) => {

  return (
    <div className={styles['search-mode']}>
      <span className={styles['label']}>
        { leftLabel.text }
        { !!leftLabel.hint && <Hint message={leftLabel.hint}></Hint> }
      </span>

      <div 
        className={styles['switch']}
        onClick={() => setMode(!mode)}
      >
        <div className={styles['switch-circle'] + (mode ? ' ' + styles['switch-circle_active'] : '')}></div>
      </div>

      <span className={styles['label']}>
        { rightLabel.text }
        { !!rightLabel.hint && <Hint message={rightLabel.hint}></Hint> }
      </span>
    </div>
  );
}