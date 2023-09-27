import { FunctionComponent, MouseEventHandler } from 'react';
import styles from '../../styles/button.module.css';
import classNames from 'classnames';

interface Props {
  onClickHandler: MouseEventHandler;
  className?: string;
  text?: string;
}

export const UploadButton: FunctionComponent<Props> = ({
  onClickHandler,
  className,
  text = 'UPLOAD',
}) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        onClickHandler(event);
      }}
      type="submit"
      className={classNames(styles.button, styles.button_size_huge, className)}
    >
      {text}
    </button>
  );
};
