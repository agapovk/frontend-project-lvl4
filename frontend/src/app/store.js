import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/chatSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
