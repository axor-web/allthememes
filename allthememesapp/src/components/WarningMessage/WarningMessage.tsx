import { FunctionComponent } from 'react';
import styles from './WarningMessage.module.css';

interface Props {
  message?: string;
}

export const WarningMessage: FunctionComponent<Props> = ({
  message = 'The hashtag name can only consist of lowercase latin letters and numbers',
}) => {
  return <div className={styles['warning-message']}>{message}</div>;
};
