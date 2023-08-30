import { FunctionComponent } from "react";
import styles from './Hint.module.css';

interface Props {
  message?: string
}

export const Hint: FunctionComponent<Props> = ({ message = 'Enter a query for ChatGPT, which analyzes it and selects hashtags.' }) => {
  return (
    <div className={styles.hint}>
      <div className={styles.hint__question}>?</div>
      <div className={styles.hint__message}>{message}</div>
    </div>
  );
}