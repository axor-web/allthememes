import Link from "next/link";
import { FunctionComponent } from "react";
import styles from '../../styles/button.module.css';

interface Props {
  text?: string,
  href?: string
}

export const UploadNavButton: FunctionComponent<Props> = ({ text = 'Upload your meme', href = './upload' }) => {
  return (
    <Link href={href} className={styles.button}>{ text }</Link>
  );
}