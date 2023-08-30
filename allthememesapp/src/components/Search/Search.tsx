'use client';

import { FunctionComponent, useEffect, useState } from "react";
import { SearchMode } from "../SearchMode/SearchMode";
import { ChatGPTInput } from "../ChatGPTInput/ChatGPTInput";
import { FindButton } from "../FindButton/FindButton";
import { HashtagInput } from "../HashtagInput/HashtagInput";
import IHashtag from "@/interfaces/IHashtag";
import styles from './Search.module.css';
import { useDispatch } from "react-redux";
import { statusActions } from "@/redux/features/statusHeader";
import { hashtagActions } from "@/redux/features/hashtags";

export const Search: FunctionComponent = () => {
  const [mode, setMode] = useState(false);
  const [addedHashtags, setAddedHashtags] = useState(new Set() as Set<string | never>);
  const [allHashtags, setAllHashtags] = useState([] as (IHashtag | never)[]);
  
  useEffect(() => {
    fetch('http://localhost:3001/hashtags', { next: { revalidate: 10 } })
    .then((response) => response.json())
    .then((hashtagObjects: IHashtag[]) => setAllHashtags(hashtagObjects));
  });

  const dispatch = useDispatch();
  
  return (
    <div className={styles.search}>
      <SearchMode modeState={[mode, setMode]}></SearchMode>
      <form className={styles['search-form']}>
        <HashtagInput hashtagsState={[addedHashtags, setAddedHashtags]} allHashtags={allHashtags.map((hashtagObject) => hashtagObject.name)} disabled={mode}></HashtagInput>
        <ChatGPTInput disabled={!mode}></ChatGPTInput>

        <FindButton onClickHandler={async () => {
          dispatch(statusActions.setIsLoading(true));

          if (mode) {
            dispatch(statusActions.setStatus('Analyzing your query'));
          }

          dispatch(statusActions.setStatus('Finding memes'))
          dispatch(hashtagActions.setHashtags([...addedHashtags]))
          dispatch(hashtagActions.setIsSearch(true));
        }}></FindButton>
      </form>
    </div>
  );
}