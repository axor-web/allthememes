import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IImage } from '@/types/IImage';

const imageInitialState: IImage = {
  image: '',
  format: '',
  isWarning: false,
};

const imageSlice = createSlice({
  name: 'image',
  initialState: imageInitialState,
  reducers: {
    setImage: (state: IImage, { payload }: { payload: string }) => {
      state.image = payload;
    },
    setImageFormat: (state: IImage, { payload }: { payload: string }) => {
      state.format = payload;
    },
    setIsWarning: (state: IImage, { payload }: { payload: boolean }) => {
      state.isWarning = payload;

      if (!payload) {
        delete state.warningMessage;
      }
    },
    setWarningMessage: (state: IImage, { payload }: { payload: string }) => {
      state.warningMessage = payload;
    },

    reset: () => imageInitialState,
  },
});

export const imageReducer = imageSlice.reducer;
export const imageActions = imageSlice.actions;

export const selectImage = (state: RootState) => state.image.image;
export const selectImageFormat = (state: RootState) => state.image.format;
export const selectIsImageWarning = (state: RootState) => state.image.isWarning;
export const selectImageWarningMessage = (state: RootState) =>
  state.image.warningMessage;
