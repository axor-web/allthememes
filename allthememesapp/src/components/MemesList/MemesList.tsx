import { FunctionComponent } from "react";
import IMeme from "@/interfaces/IMeme";
import styles from './MemesList.module.css';
import { Meme } from "../Meme/Meme";
import { getMemes } from "@/api/getMemes";

export const MemesList: FunctionComponent = async () => {
  const memes: IMeme[] = await getMemes();

  return (
    <ul className={styles['memes-list']}>
      { memes.map((meme, index) => (<Meme meme={meme} key={meme._id ?? index}></Meme>)) }
    </ul>
  );
}