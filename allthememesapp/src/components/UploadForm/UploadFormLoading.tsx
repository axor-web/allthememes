import { FunctionComponent } from 'react';

import styles from './UploadForm.module.css';
import formLoadingStyles from './UploadFormLoading.module.css';
import buttonStyles from '../../styles/button.module.css';
import loadingStyles from '../../styles/loading.module.css';
import classNames from 'classnames';

export const UploadFormLoading: FunctionComponent = () => {
  return (
    <form className={styles.form}>
      <div
        className={classNames(
          styles.image,
          formLoadingStyles.image,
          loadingStyles._loading,
        )}
      ></div>
      <div
        className={classNames(
          styles.hashtags,
          formLoadingStyles.hashtags,
          loadingStyles._loading,
        )}
      ></div>
      <div
        className={classNames(
          styles.button,
          formLoadingStyles.button,
          buttonStyles.button,
          buttonStyles.button_size_huge,
          loadingStyles._loading,
        )}
      >
        UPLOAD
      </div>
    </form>
  );
};
