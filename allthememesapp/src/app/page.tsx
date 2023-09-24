'use client';

import { StatusHead } from '@/components/StatusHead/StatusHead';
import { Search } from '@/components/Search/Search';
import { MemesList } from '@/components/MemesList/MemesList';
import { useDispatch } from 'react-redux';
import { hashtagActions } from '@/redux/features/hashtags';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(hashtagActions.setIsFirstSearch(true));
      dispatch(hashtagActions.setIsSearch(true));
    };
  }, [dispatch]);

  return (
    <>
      <StatusHead></StatusHead>
      <Search></Search>
      <MemesList></MemesList>
    </>
  );
}
