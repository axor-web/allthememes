import { FunctionComponent } from "react";
import { MainPageLink } from "../MainPageLink/MainPageLink";
import { UploadNavButton } from "../UploadNavButton/UploadNavButton";
import styles from './Header.module.css';

export const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <MainPageLink></MainPageLink>
      <UploadNavButton></UploadNavButton>
    </header>
  );
}