'use client';

import { ChangeEvent, Dispatch, FunctionComponent, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { UploadSvg } from "../UploadSvg/UploadSvg";
import Image from "next/image";
import classNames from "classnames";
import { RemoveSvg } from "../RemoveSvg/RemoveSvg";
import { useDispatch, useSelector } from "react-redux";
import { imageActions, selectImageWarningMessage, selectIsImageWarning } from "@/redux/features/image";
import inputStyles from '../../styles/input.module.css';
import styles from './UploadImageInput.module.css';
import { WarningMessage } from "../WarningMessage/WarningMessage";

interface Props {
  className?: string
}

export const UploadImageInput: FunctionComponent<Props> = ({className = ''}) => {
  const [image, setImage]: [File | undefined, Dispatch<File | undefined>] = useState();

  const isWarning = useSelector(selectIsImageWarning);
  const warningMessage = useSelector(selectImageWarningMessage);

  const inputRef: MutableRefObject<null | HTMLInputElement> = useRef(null);

  const dispatch = useDispatch();
  let readerRef: MutableRefObject<undefined | FileReader> = useRef();

  useEffect(() => {
    readerRef.current = new FileReader();

    return () => {
      dispatch(imageActions.reset());
    };
  }, [dispatch]);

  const onClickHandler = useCallback(() => {
    dispatch(imageActions.setIsWarning(false));

    if (inputRef.current) {
      inputRef.current.dispatchEvent(new MouseEvent('click'));
    }
  }, [dispatch]);

  const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(imageActions.setIsWarning(false));

    if (event.target?.files?.length && readerRef.current) {
      setImage(event.target.files[0]);

      dispatch(imageActions.setImageFormat(event.target.files[0].type));
      
      readerRef.current.readAsBinaryString(event.target.files[0]);
      
      readerRef.current.onload = () => {
        dispatch(imageActions.setImage((readerRef.current?.result ?? '') as string));
      }
    }
  }, [dispatch]);

  const removeOnClickHandler = useCallback(() => {
    setImage(undefined);
    dispatch(imageActions.setImage(''));

    if (inputRef.current?.value) {
      inputRef.current.value = '';
    }
  }, [dispatch]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={classNames(styles.container, isWarning ? inputStyles.input_invalid : '')}>
        <button
          type="button"
          className={classNames(styles.button, !!image ? styles.hidden : '')}
          onClick={onClickHandler}
        >
          <UploadSvg />
        </button>

        <input
          ref={inputRef}
          type="file"
          name="image"
          id="image"
          accept='.jpg, .jpeg, .png, .webp, .gif'
          className={classNames('visually-hidden', !!image ? styles.hidden : '')}
          onChange={changeHandler}
        />

        { !!image &&
        <div className={styles.preview}>
          <Image className={styles.preview_image} alt="meme" fill={true} style={{objectFit: "cover"}} src={URL.createObjectURL(image)} />
          <button
            type="button"
            className={classNames(styles.button, styles['remove-button'])}
            onClick={removeOnClickHandler}
          >
            <RemoveSvg />
          </button>
        </div>
        }
      </div>

      { isWarning && <WarningMessage message={warningMessage} /> }
    </div>
  );
};