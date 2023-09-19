import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  requestsCount: 0
};

const apiSlice = createSlice({
  name: 'api',
  initialState: initialState,
  reducers: {
    incrementRequestsCount: (state: typeof initialState) => {
      state.requestsCount++;
    },
    decrementRequestCount: (state: typeof initialState) => {
      state.requestsCount--;
      if (state.requestsCount < 0) { state.requestsCount = 0; }
    },
    resetRequestCount: () => initialState
  }
});

export const apiActions = apiSlice.actions;
export const apiReducer = apiSlice.reducer;

export const selectRequestsCount = (state: RootState) => state.api.requestsCount;