import { FunctionComponent } from 'react';
import buttonStyles from '../../styles/button.module.css';
import styles from './EditButton.module.css';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  href?: string;
  className?: string;
}

export const EditButton: FunctionComponent<Props> = ({
  href = '',
  className,
}) => {
  return (
    <Link
      href={href}
      className={classNames(
        buttonStyles.button,
        buttonStyles.button_size_huge,
        styles.button,
        className,
      )}
    >
      Edit
    </Link>
  );
};
