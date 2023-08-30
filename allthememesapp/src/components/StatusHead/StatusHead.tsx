'use client';

import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styles from './StatusHead.module.css';
import { selectStatus } from "@/redux/features/statusHeader";

export const StatusHead: FunctionComponent = () => {
  const { status, isLoading } = useSelector((state: RootState) => selectStatus(state));

  return (
    <h1 className={styles['status-head'] + (isLoading ? ' ' + styles['status-head_loading'] : '')}>
      { status }
      { isLoading && <><span className={styles['loading-dot']}>.</span><span className={styles['loading-dot']}>.</span><span className={styles['loading-dot']}>.</span></> }
    </h1>
  );
}