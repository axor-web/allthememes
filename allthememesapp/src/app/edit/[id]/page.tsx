'use client';

import { getMeme } from '@/api/getMeme';
import { StatusHead } from '@/components/StatusHead/StatusHead';
import { UploadForm } from '@/components/UploadForm/UploadForm';
import { statusActions } from '@/redux/features/statusHeader';
import IMeme from '@/types/IMeme';
import { notFound } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Page({ params }: { params: { id: string } }) {
  const [meme, setMeme]: [IMeme, Dispatch<SetStateAction<IMeme>>] = useState(
    {},
  );
  const [isFetch, setIsFetch] = useState(true);

  const dispatch = useDispatch();

  dispatch(statusActions.setStatus('Edit your meme!'));

  useEffect(() => {
    if (isFetch) {
      getMeme(params.id)
        .then((response) => {
          setMeme(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsFetch(false);
        });
    }
  }, [params.id, meme, isFetch]);

  if (!isFetch && !meme._id) {
    return notFound();
  }

  return (
    <>
      <StatusHead />
      {!isFetch && <UploadForm mode="edit" meme={meme} />}
    </>
  );
}
