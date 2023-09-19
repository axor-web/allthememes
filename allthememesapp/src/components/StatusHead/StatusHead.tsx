'use client';

import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectStatus, statusActions } from "@/redux/features/statusHeader";
import classNames from "classnames";
import Link from "next/link";
import styles from './StatusHead.module.css';
import linkStyles from '../../styles/link.module.css';

export const StatusHead: FunctionComponent = () => {
  const { status, isLoading, isRetryButtonVisible, isGoToMainPageLinkVisible } = useSelector((state: RootState) => selectStatus(state));
  const dispatch = useDispatch();

  function hideButtons() {
    dispatch(statusActions.setIsGoToMainPageLinkVisible(false));
    dispatch(statusActions.setIsRetryButtonVisible(false));
  }

  return (
    <span className={styles['status-container']}>
      <h1 className={classNames(styles['status-head'], isLoading ? styles['status-head_loading'] : '')}>
        { status }
        { isLoading && <><span className={styles['loading-dot']}>.</span><span className={styles['loading-dot']}>.</span><span className={styles['loading-dot']}>.</span></> }
      </h1>

      <nav className={styles.buttons}>
        { isRetryButtonVisible && 
          <button
            type="button"
            className={linkStyles.link}
            onClick={() => {
              dispatch(statusActions.setIsRetry(true));
              hideButtons();
            }}
            >
              Retry
          </button> 
        }
        { isGoToMainPageLinkVisible && 
          <Link
            href={'./'}
            className={linkStyles.link}
            onClick={hideButtons}
          >
            Go to Main page
          </Link>
        }
      </nav>
    </span>
  );
}