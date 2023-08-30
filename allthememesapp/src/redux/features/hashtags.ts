import IHashtagsState from "@/interfaces/IHashtagsState";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const hashtagsInitialState: IHashtagsState = {
  hashtags: [],
  isSearch: true
};

const hashtagsSlice = createSlice({
  name: 'hashtags',
  initialState: hashtagsInitialState,
  reducers: {
    setHashtags: (state: IHashtagsState, { payload }: { payload: string[] }) => {
      state.hashtags = payload;
    },
    setIsSearch: (state: IHashtagsState, { payload }: { payload: boolean }) => {
      state.isSearch = payload;
    },

    reset: () => hashtagsInitialState
  }
});

export const hashtagsReducer = hashtagsSlice.reducer;
export const hashtagActions = hashtagsSlice.actions;

export const selectHashtags = (state: RootState) => state.hashtags;
export const selectHashtagsArray = (state: RootState) => selectHashtags(state).hashtags;
export const selectIsSearch = (state: RootState) => selectHashtags(state).isSearch;