import { configureStore } from '@reduxjs/toolkit'
import { statusReducer } from './features/statusHeader';
import { hashtagsReducer } from './features/hashtags';
import { imageReducer } from './features/image';
import { apiReducer } from './features/api';

export const store = configureStore({
  reducer: {
    status: statusReducer,
    hashtags: hashtagsReducer,
    image: imageReducer,
    api: apiReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;