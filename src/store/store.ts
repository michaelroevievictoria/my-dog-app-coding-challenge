import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
