import IStatusState from '@/types/IStatusState';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: IStatusState = {
  status: `Let's find your meme!`,
  isLoading: false,
  isUploading: false,
  isRetry: false,
  isGoToMainPageLinkVisible: false,
  isRetryButtonVisible: false,
};

const statusSlice = createSlice({
  name: 'status',
  initialState: initialState,
  reducers: {
    setStatus: (state: IStatusState, { payload }: { payload: string }) => {
      state.status = payload;
    },
    setIsLoading: (state: IStatusState, { payload }: { payload: boolean }) => {
      state.isLoading = payload;
    },
    setIsUploading: (
      state: IStatusState,
      { payload }: { payload: boolean },
    ) => {
      state.isUploading = payload;
    },
    setIsRetry: (state: IStatusState, { payload }: { payload: boolean }) => {
      state.isRetry = payload;
    },
    setIsGoToMainPageLinkVisible: (
      state: IStatusState,
      { payload }: { payload: boolean },
    ) => {
      state.isGoToMainPageLinkVisible = payload;
    },
    setIsRetryButtonVisible: (
      state: IStatusState,
      { payload }: { payload: boolean },
    ) => {
      state.isRetryButtonVisible = payload;
    },

    reset: () => initialState,
  },
});

export const statusReducer = statusSlice.reducer;
export const statusActions = statusSlice.actions;

export const selectStatus = (state: RootState) => state.status;
export const selectStatusMessage = (state: RootState) =>
  selectStatus(state).status;
export const selectIsLoading = (state: RootState) =>
  selectStatus(state).isLoading;
export const selectIsUploading = (state: RootState) =>
  selectStatus(state).isUploading;
export const selectIsRetry = (state: RootState) => selectStatus(state).isRetry;
export const selectIsGoToMainPageLinkVisible = (state: RootState) =>
  selectStatus(state).isGoToMainPageLinkVisible;
export const selectIsRetryButtonVisible = (state: RootState) =>
  selectStatus(state).isRetryButtonVisible;
