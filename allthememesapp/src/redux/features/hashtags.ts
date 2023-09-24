import IHashtagsState from '@/types/IHashtagsState';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const hashtagsInitialState: IHashtagsState = {
  hashtags: [],
  isSearch: true,
  isFirstSearch: true,
  isWarning: false,
  prompt: '',
  mode: false,
};

const hashtagsSlice = createSlice({
  name: 'hashtags',
  initialState: hashtagsInitialState,
  reducers: {
    setHashtags: (
      state: IHashtagsState,
      { payload }: { payload: string[] },
    ) => {
      state.hashtags = payload;
    },
    setPrompt: (state: IHashtagsState, { payload }: { payload: string }) => {
      state.prompt = payload;
    },
    setIsSearch: (state: IHashtagsState, { payload }: { payload: boolean }) => {
      state.isSearch = payload;
    },
    setIsFirstSearch: (
      state: IHashtagsState,
      { payload }: { payload: boolean },
    ) => {
      state.isFirstSearch = payload;
    },
    setIsWarning: (
      state: IHashtagsState,
      { payload }: { payload: boolean },
    ) => {
      state.isWarning = payload;

      if (!payload) {
        delete state.warningMessage;
      }
    },
    setWarningMessage: (
      state: IHashtagsState,
      { payload }: { payload: string },
    ) => {
      state.warningMessage = payload;
    },
    setMode: (state: IHashtagsState, { payload }: { payload: boolean }) => {
      state.mode = payload;
    },

    reset: () => hashtagsInitialState,
  },
});

export const hashtagsReducer = hashtagsSlice.reducer;
export const hashtagActions = hashtagsSlice.actions;

export const selectHashtags = (state: RootState) => state.hashtags;
export const selectHashtagsArray = (state: RootState) =>
  selectHashtags(state).hashtags;
export const selectPrompt = (state: RootState) => selectHashtags(state).prompt;
export const selectIsSearch = (state: RootState) =>
  selectHashtags(state).isSearch;
export const selectIsFirstSearch = (state: RootState) =>
  selectHashtags(state).isFirstSearch;
export const selectIsHashtagsWarning = (state: RootState) =>
  selectHashtags(state).isWarning;
export const selectHashtagWarningMessage = (state: RootState) =>
  selectHashtags(state).warningMessage;
export const selectMode = (state: RootState) => selectHashtags(state).mode;
