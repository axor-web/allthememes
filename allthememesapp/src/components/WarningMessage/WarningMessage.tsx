import { FunctionComponent } from 'react';
import styles from './WarningMessage.module.css';

interface Props {
  message?: string,
  coordinates?: DOMRect;
}

export const WarningMessage: FunctionComponent<Props> = ({
  message = 'The hashtag name can only consist of lowercase latin letters and numbers',
  coordinates
}) => {
  return (
    <div
      className={styles['warning-message']}
      style={coordinates ? {
        top: `${(coordinates?.top ?? 0) + document.documentElement.scrollTop - 12}px`,
        left: `${(((coordinates?.left ?? 0) + (coordinates?.right ?? 0)) / 2)}px`
      } : undefined}
    >
      {message}
    </div>
  );
};
