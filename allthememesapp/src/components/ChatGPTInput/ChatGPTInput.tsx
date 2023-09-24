import { FunctionComponent, MutableRefObject } from 'react';
import styles from '../../styles/input.module.css';

interface Props {
  disabled?: boolean;
  prompt: MutableRefObject<string>;
}

export const ChatGPTInput: FunctionComponent<Props> = ({
  disabled,
  prompt,
}) => {
  return (
    <input
      type="text"
      className={
        styles.input + (disabled ? ' ' + styles['input_disabled'] : '')
      }
      placeholder="Enter a query for AI..."
      autoFocus
      onChange={(event) => (prompt.current = event.target.value)}
    />
  );
};
