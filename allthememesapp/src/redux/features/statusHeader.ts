import IStatusState from "@/interfaces/IStatusState";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: IStatusState = {
  status: `Let's find your meme!`,
  isLoading: false
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

    reset: () => initialState
  }
});

export const statusReducer = statusSlice.reducer;
export const statusActions = statusSlice.actions;

export const selectStatus = (state: RootState) => state.status;
export const selectStatusMessage = (state: RootState) => selectStatus(state).status;
export const selectIsLoading = (state: RootState) => selectStatus(state).isLoading;