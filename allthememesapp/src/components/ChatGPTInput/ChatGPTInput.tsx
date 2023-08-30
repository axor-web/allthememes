import { FunctionComponent, useEffect, useRef } from "react";
import styles from '../../styles/input.module.css';

interface Props {
  disabled?: boolean
}

export const ChatGPTInput: FunctionComponent<Props> = ({ disabled }) => {
  return (
    <input type="text" className={styles.input + (disabled ? ' ' + styles['input_disabled'] : '')} placeholder="Enter a query for ChatGPT..." autoFocus />
  );
}