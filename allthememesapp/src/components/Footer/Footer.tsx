import { FunctionComponent } from "react";
import { MainPageLink } from "../MainPageLink/MainPageLink";
import { UploadNavButton } from "../UploadNavButton/UploadNavButton";
import styles from './Footer.module.css';

export const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <MainPageLink></MainPageLink>
      <UploadNavButton></UploadNavButton>
    </footer>
  );
}