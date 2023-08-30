import { FunctionComponent } from "react";
import Image from "next/image";
import { NoImageSvg } from "../NoImageSvg/NoImageSvg";
import { DownloadSvg } from "../DownloadSvg/DownloadSvg";
import styles from './Meme.module.css';
import IMeme from "@/interfaces/IMeme";
import Link from "next/link";

interface Props {
  meme: IMeme
}

export const Meme: FunctionComponent<Props> = ({meme: { _id, url, hashtags = [] }}) => {
  return (
    <li className={styles['meme-card']}>
      <div className={styles['meme-image']}>
        {!!url 
          ? <Image src={url} alt='Meme Image' height={500} width={500}></Image>
          : <NoImageSvg></NoImageSvg> }
      </div>

      {!!url && <Link href={url} target="_blank" download={'meme.png'} className={styles['meme-download']}><DownloadSvg></DownloadSvg></Link>}
      
      { !!hashtags.length &&
        <ul className={styles['meme-hashtags']}>
          { hashtags.map((hashtag, index) => (<li key={index} className={styles['meme-hashtag']}>{'#' + hashtag}</li>)) }
        </ul>
      }
    </li>
  );
}