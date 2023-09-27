'use client';

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UploadImageInput } from '../UploadImageInput/UploadImageInput';
import { UploadButton } from '../UploadButton/UploadButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsRetry,
  selectIsUploading,
  statusActions,
} from '@/redux/features/statusHeader';
import { HashtagInput } from '../HashtagInput/HashtagInput';
import { hashtagActions } from '@/redux/features/hashtags';
import IHashtag from '@/types/IHashtag';
import styles from './UploadForm.module.css';
import {
  imageActions,
  selectImage,
  selectImageFormat,
} from '@/redux/features/image';
import { uploadMeme } from '@/api/uploadMeme';
import Image from 'next/image';
import classNames from 'classnames';
import IMeme from '@/types/IMeme';
import { updateMeme } from '@/api/updateMeme';

interface Props {
  mode?: 'edit' | 'upload';
  meme?: IMeme;
}

export const UploadForm: FunctionComponent<Props> = ({
  mode = 'upload',
  meme = {},
}) => {
  const hashtags = useRef(
    new Set(meme.hashtags ?? undefined) as Set<string | never>,
  );

  const [allHashtags, setAllHashtags] = useState([] as (IHashtag | never)[]);

  const image = useSelector(selectImage);
  const format = useSelector(selectImageFormat);
  const isUploading = useSelector(selectIsUploading);

  const isRetry = useSelector(selectIsRetry);

  const dispatch = useDispatch();

  const uploadMemeHandler = useCallback(() => {
    if (
      hashtags.current.size === 0 ||
      (mode === 'upload' && image.length === 0)
    ) {
      if (hashtags.current.size === 0) {
        dispatch(hashtagActions.setIsWarning(true));
        dispatch(
          hashtagActions.setWarningMessage(
            'You must specify at least 1 hashtag for the meme',
          ),
        );
      }
      if (mode === 'upload' && image.length === 0) {
        dispatch(imageActions.setIsWarning(true));
        dispatch(
          imageActions.setWarningMessage(
            'You must upload a picture for the meme',
          ),
        );
      }

      return;
    }

    dispatch(statusActions.setIsUploading(true));
    dispatch(statusActions.setIsLoading(true));

    dispatch(
      statusActions.setStatus(
        mode === 'upload' ? 'Uploading to server' : 'Editing your meme',
      ),
    );

    (mode === 'upload'
      ? uploadMeme({
          img: image,
          hashtags: [...hashtags.current],
          format: format,
        })
      : updateMeme({
          hashtags: [...hashtags.current],
          _id: meme._id,
        })
    ).then((response) => {
      dispatch(statusActions.setIsLoading(false));
      dispatch(statusActions.setIsGoToMainPageLinkVisible(true));

      if (response) {
        dispatch(statusActions.setStatus('Success!'));
      } else {
        dispatch(statusActions.setStatus('Something went wrong :<'));
        dispatch(statusActions.setIsRetryButtonVisible(true));
      }
    });
  }, [dispatch, format, hashtags, image, mode, meme._id]);

  useEffect(() => {
    dispatch(
      statusActions.setStatus(
        mode === 'upload' ? 'Upload your meme!' : 'Edit your meme!',
      ),
    );

    fetch('http://localhost:3001/hashtags', { next: { revalidate: 100 } })
      .then((response) => response.json())
      .then((hashtagObjects: IHashtag[]) => setAllHashtags(hashtagObjects));
  }, [dispatch, mode]);

  useEffect(() => {
    if (isRetry) {
      uploadMemeHandler();
      dispatch(statusActions.setIsRetry(false));
    }
  }, [isRetry, uploadMemeHandler, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(statusActions.setIsUploading(false));
    };
  }, [dispatch]);

  return (
    <form
      method="POST"
      className={classNames(
        styles.form,
        isUploading ? styles.form_uploading : '',
      )}
    >
      {mode === 'upload' ? (
        <UploadImageInput className={classNames(styles.upload)} />
      ) : (
        <div className={styles.image}>
          {meme.img && (
            <Image
              src={meme.img}
              alt="Meme Image"
              fill={true}
              priority={true}
              sizes="100%"
              style={{ objectFit: 'cover' }}
              loader={() => 'http://' + (meme.img ?? '')}
            />
          )}
        </div>
      )}

      <HashtagInput
        addedHashtagsRef={hashtags}
        allHashtags={allHashtags.map((hashtagObject) => hashtagObject.name)}
        isAllowedNonExistingHashtags={true}
        size="wide"
      />

      <UploadButton
        className={styles.button}
        onClickHandler={uploadMemeHandler}
        text={mode === 'upload' ? 'UPLOAD' : 'SAVE'}
      ></UploadButton>
    </form>
  );
};
