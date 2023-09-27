'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import styles from './MemesList.module.css';
import { Meme } from '../Meme/Meme';
import { getMemes } from '@/api/getMemes';
import { useDispatch, useSelector } from 'react-redux';
import {
  hashtagActions,
  selectHashtagsArray,
  selectIsFirstSearch,
  selectIsSearch,
  selectMode,
  selectPrompt,
} from '@/redux/features/hashtags';
import {
  selectIsLoading,
  selectIsRetry,
  statusActions,
} from '@/redux/features/statusHeader';
import { IMemes } from '@/types/IMemes';
import { getMemesByQuery } from '@/api/getMemesByQuery';

export const MemesList: FunctionComponent = () => {
  const hashtags = useSelector(selectHashtagsArray);
  const prompt = useSelector(selectPrompt) ?? '';
  const mode = useSelector(selectMode);
  const isSearch = useSelector(selectIsSearch);
  const isFirstSearch = useSelector(selectIsFirstSearch);
  const isLoading = useSelector(selectIsLoading);
  const isRetry = useSelector(selectIsRetry);

  const dispatch = useDispatch();

  const [memes, setMemes]: [IMemes | undefined, Function] = useState();

  useEffect(() => {
    if (isSearch || isRetry) {
      (mode ? getMemesByQuery(prompt) : getMemes(hashtags))
        .then((response) => {
          setMemes(response);

          if (!response?.length) {
            dispatch(statusActions.setStatus('Memes not found :<'));
            dispatch(statusActions.setIsUploadButtonVisible(true));
          } else if (!isFirstSearch) {
            dispatch(statusActions.setStatus('Memes found! :3'));
          }

          dispatch(hashtagActions.setIsFirstSearch(false));
        })
        .catch(() => {
          dispatch(statusActions.setStatus('Error while finding memes :<'));
          dispatch(statusActions.setIsRetryButtonVisible(true));
        })
        .finally(() => {
          dispatch(statusActions.setIsLoading(false));
          dispatch(hashtagActions.setIsSearch(false));
          dispatch(statusActions.setIsRetry(false));
        });
    }
  }, [isSearch, hashtags, dispatch, isFirstSearch, mode, prompt, isRetry]);

  return (
    <section>
      <ul className={styles['memes-list']}>
        {!!memes?.length
          ? memes.map((memeId, index) => (
              <Meme memeId={memeId} key={memeId ?? index} isFirst={index < 2} />
            ))
          : (isLoading || isFirstSearch) &&
            Array.from({ length: 3 }, (_, index) => (
              <Meme loading={true} key={index} />
            ))}
      </ul>
    </section>
  );
};
