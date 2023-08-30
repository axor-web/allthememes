import { configureStore } from '@reduxjs/toolkit'
import { statusReducer } from './features/statusHeader';
import { hashtagsReducer } from './features/hashtags';

export const store = configureStore({
  reducer: {
    status: statusReducer,
    hashtags: hashtagsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;