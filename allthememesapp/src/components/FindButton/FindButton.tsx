import { FunctionComponent, MouseEventHandler } from 'react';
import styles from '../../styles/button.module.css';

interface Props {
  onClickHandler: MouseEventHandler;
}

export const FindButton: FunctionComponent<Props> = ({ onClickHandler }) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        onClickHandler(event);
      }}
      type="submit"
      className={styles.button + ' ' + styles.button_size_big}
    >
      Find
    </button>
  );
};
