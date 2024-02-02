import { configureStore, combineReducers } from '@reduxjs/toolkit';
import likedImagesReducer from './slices/likedImageSlice'

const rootReducer = combineReducers({
  likedImages: likedImagesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
