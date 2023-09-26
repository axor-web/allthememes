'use client';

import {
  Dispatch,
  FunctionComponent,
  MutableRefObject,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { NoImageSvg } from '../NoImageSvg/NoImageSvg';
import { DownloadSvg } from '../DownloadSvg/DownloadSvg';
import styles from './MemePage.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { getMeme } from '@/api/getMeme';
import IMeme from '@/types/IMeme';
import { notFound } from 'next/navigation';
import { getBinaryImage } from '@/api/getBinaryImage';
import IBinaryImage from '@/types/IBinaryImage';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import { EditButton } from '../EditButton/EditButton';

interface Props {
  memeId: string;
}

export const MemePage: FunctionComponent<Props> = ({ memeId = '' }) => {
  const [meme, setMeme]: [
    undefined | IMeme,
    Dispatch<SetStateAction<undefined | IMeme>>,
  ] = useState();
  const [binaryImage, setBinaryImage]: [
    undefined | IBinaryImage,
    Dispatch<SetStateAction<undefined | IBinaryImage>>,
  ] = useState();

  const isFetch = useRef(false);

  const memeCard: MutableRefObject<null | HTMLDivElement> = useRef(null);

  useLayoutEffect(() => {
    if (!isFetch.current) {
      isFetch.current = true;

      getMeme(memeId)
        .then((data) => {
          setMeme(data);
        })
        .catch((error) => {
          console.error(error);
          setMeme({});
        })
        .then(() => {
          return getBinaryImage(memeId);
        })
        .then((data) => {
          data.image = btoa(data.image);
          setBinaryImage(data);
        })
        .catch(() => {
          setBinaryImage({});
        });
    }
  }, [memeId]);

  const isLoading = !meme;

  let {
    img = '',
    format = '',
    hashtags = [],
    _id = '',
  } = isLoading ? {} : meme;

  if (!isLoading && !('_id' in meme)) {
    return notFound();
  }

  return (
    <div className={styles['meme-page']}>
      <div
        className={classNames(
          styles['meme-card'],
          isLoading ? styles['meme-card_loading'] : '',
        )}
        ref={memeCard}
      >
        <div className={styles['meme-image']}>
          {!!img ? (
            <Image
              src={img}
              loader={() => 'http://' + img}
              alt="Meme Image"
              fill={true}
              sizes={'100%'}
              priority={true}
              style={{ objectFit: 'cover' }}
              className={styles.img}
            />
          ) : (
            <NoImageSvg></NoImageSvg>
          )}
        </div>

        {!!img && (
          <Link
            href={
              binaryImage?.image
                ? 'data:' +
                  (binaryImage?.format ?? 'image/jpeg') +
                  ';base64,' +
                  binaryImage.image
                : 'http://' + img
            }
            target="_blank"
            download={`meme.${format.split('/')[1]}`}
            className={styles['meme-download']}
          >
            <DownloadSvg></DownloadSvg>
          </Link>
        )}
      </div>

      <ul className={styles['meme-hashtags']}>
        {hashtags.map((hashtag, index) => (
          <li key={index} className={styles['meme-hashtag']}>
            {'#' + hashtag}
          </li>
        ))}
      </ul>

      <EditButton className={styles['edit-button']} href={`/edit/${_id}`} />
      <DeleteButton className={styles['delete-button']} memeId={_id} />
    </div>
  );
};
