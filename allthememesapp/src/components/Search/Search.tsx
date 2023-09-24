'use client';

import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { SearchMode } from '../SearchMode/SearchMode';
import { ChatGPTInput } from '../ChatGPTInput/ChatGPTInput';
import { FindButton } from '../FindButton/FindButton';
import { HashtagInput } from '../HashtagInput/HashtagInput';
import IHashtag from '@/types/IHashtag';
import styles from './Search.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { statusActions } from '@/redux/features/statusHeader';
import { hashtagActions, selectMode } from '@/redux/features/hashtags';

export const Search: FunctionComponent = () => {
  const [allHashtags, setAllHashtags] = useState([] as (IHashtag | never)[]);
  const addedHashtags = useRef(new Set() as Set<string | never>);
  const prompt = useRef('');

  const dispatch = useDispatch();

  const mode = useSelector(selectMode);

  useEffect(() => {
    dispatch(statusActions.setStatus(`Let's find your meme!`));

    fetch('http://localhost:3001/hashtags', { next: { revalidate: 100 } })
      .then((response) => response.json())
      .then((hashtagObjects: IHashtag[]) => setAllHashtags(hashtagObjects));
  }, [dispatch]);

  return (
    <section className={styles.search}>
      <SearchMode></SearchMode>
      <form className={styles['search-form']}>
        <HashtagInput
          addedHashtagsRef={addedHashtags}
          allHashtags={allHashtags.map((hashtagObject) => hashtagObject.name)}
          disabled={mode}
        />
        <ChatGPTInput prompt={prompt} disabled={!mode} />

        <FindButton
          onClickHandler={async () => {
            dispatch(statusActions.setIsLoading(true));

            dispatch(statusActions.setStatus('Finding memes'));
            dispatch(hashtagActions.setPrompt(prompt.current));
            dispatch(hashtagActions.setHashtags([...addedHashtags.current]));
            dispatch(hashtagActions.setIsSearch(true));
          }}
        />
      </form>
    </section>
  );
};
