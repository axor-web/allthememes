'use client'

import { FunctionComponent } from "react";
import { Hint } from "../Hint/Hint";
import styles from './SearchMode.module.css';
import { useDispatch, useSelector } from "react-redux";
import { hashtagActions, selectMode } from "@/redux/features/hashtags";

interface Label {
  text: string,
  hint?: string
}
interface Props {
  leftLabel?: Label,
  rightLabel?: Label,
}

export const SearchMode: FunctionComponent<Props> = ({
  leftLabel = { text: 'Hashtag Mode' },
  rightLabel = { text: 'AI Query Mode', hint: 'Enter a query for AI, which analyzes it and selects hashtags.'},
}) => {

  const dispatch = useDispatch();
  const mode = useSelector(selectMode);

  return (
    <div className={styles['search-mode']}>
      <span className={styles['label']}>
        { leftLabel.text }
        { !!leftLabel.hint && <Hint message={leftLabel.hint}></Hint> }
      </span>

      <div 
        className={styles['switch']}
        onClick={() => dispatch(hashtagActions.setMode(!mode))}
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