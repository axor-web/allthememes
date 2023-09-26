'use client';

import { MemePage } from '@/components/MemePage/MemePage';
import { StatusHead } from '@/components/StatusHead/StatusHead';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDelete, statusActions } from '@/redux/features/statusHeader';
import styles from './page.module.css';
import classNames from 'classnames';
import { useEffect } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const isDelete = useSelector(selectIsDelete);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(statusActions.setIsDelete(false));
      dispatch(statusActions.setIsRetry(false));
      dispatch(statusActions.setIsGoToMainPageLinkVisible(false));
      dispatch(statusActions.setIsRetryButtonVisible(false));
    };
  }, [dispatch]);

  return (
    <>
      {isDelete && <StatusHead />}

      <section
        className={classNames(
          styles['meme-section'],
          isDelete && styles['meme-section_hidden'],
        )}
      >
        <MemePage memeId={params.id} />
      </section>
    </>
  );
}
