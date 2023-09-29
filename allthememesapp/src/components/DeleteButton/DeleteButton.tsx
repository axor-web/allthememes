'use client';

import { FunctionComponent, useEffect } from 'react';
import buttonStyles from '../../styles/button.module.css';
import styles from './DeleteButton.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRetry, statusActions } from '@/redux/features/statusHeader';
import { deleteMeme } from '@/api/deleteMeme';

interface Props {
  onClick?: Function;
  className?: string;
  memeId?: string;
  disabled?: boolean;
}

export const DeleteButton: FunctionComponent<Props> = ({
  onClick,
  className = '',
  memeId = '',
  disabled = false,
}) => {
  const dispatch = useDispatch();

  const isRetry = useSelector(selectIsRetry);

  const onClickHandler = () => {
    onClick && onClick();

    dispatch(statusActions.setIsDelete(true));
    dispatch(statusActions.setIsLoading(true));

    deleteMeme(memeId).then((response) => {
      dispatch(statusActions.setIsLoading(false));
      dispatch(statusActions.setIsGoToMainPageLinkVisible(true));
      dispatch(statusActions.setIsRetry(false));

      if (response) {
        dispatch(statusActions.setStatus('Success!'));
      } else {
        dispatch(statusActions.setStatus('Error during deleting meme :<'));
        dispatch(statusActions.setIsRetryButtonVisible(true));
      }
    });
  };

  useEffect(() => {
    if (isRetry) {
      onClickHandler();
    }
  });

  return (
    <button
      type="submit"
      onClick={onClickHandler}
      className={classNames(
        buttonStyles.button,
        buttonStyles.button_size_huge,
        styles.button,
        className,
      )}
      disabled={disabled}
    >
      Delete
    </button>
  );
};
