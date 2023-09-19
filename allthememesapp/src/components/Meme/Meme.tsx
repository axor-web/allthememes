import { Dispatch, FunctionComponent, MutableRefObject, SetStateAction, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { NoImageSvg } from "../NoImageSvg/NoImageSvg";
import { DownloadSvg } from "../DownloadSvg/DownloadSvg";
import styles from './Meme.module.css';
import Link from "next/link";
import classNames from "classnames";
import { getMeme } from "@/api/getMeme";
import IMeme from "@/types/IMeme";

interface Props {
  memeId?: string,
  loading?: boolean,
  isFirst?: boolean
}

export const Meme: FunctionComponent<Props> = ({memeId = '', loading = false, isFirst = false}) => {
  const [meme, setMeme]: [undefined | IMeme, Dispatch<SetStateAction<undefined | IMeme>>] = useState();

  const isFetch = useRef(false);

  const memeCard: MutableRefObject<null | HTMLLIElement> = useRef(null);

  useLayoutEffect(() => {
    if (!loading && !isFetch.current) {
      isFetch.current = true;

      getMeme(memeId)
        .then((data) => {
          setMeme(data);
        })
        .catch((error) => {
          console.error(error);
          setMeme({});
        })
    }
  }, [loading, memeId]);

  const isLoading = loading || !meme;

  let {img = '', format = '', hashtags = [], _id = ''} = isLoading ? {} : meme;

  return (
    <li className={classNames(styles['meme-card'], isLoading ? styles['meme-card_loading'] : '')} ref={memeCard}>
      <Link href={`/meme/${_id}`} className={styles['meme-image']}>
        {!!img
          ? <Image
              src={img}
              loader={() => 'http://' + img}
              alt='Meme Image'
              fill={true}
              sizes="100%"
              loading={isFirst ? 'eager' : 'lazy'}
              priority={isFirst}
              style={{objectFit: 'cover'}}
              className={styles.img}
            />
          : <NoImageSvg></NoImageSvg> }
      </Link>

      {!!img && 
        <Link
          href={'http://'+img}
          target="_blank"
          download={`meme.${format.split('/')[1]}`}
          className={styles['meme-download']}
          onClick={(event) => event.stopPropagation() }
        >
          <DownloadSvg />
        </Link>
      }
      
      { !!hashtags.length &&
        <ul className={styles['meme-hashtags']}>
          { hashtags.map((hashtag, index) => (<li key={index} className={styles['meme-hashtag']}>{'#' + hashtag}</li>)) }
        </ul>
      }
    </li>
  );
}