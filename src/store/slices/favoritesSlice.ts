import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';


interface FavoritesState {
    breeds: string[];
  }
  
  const initialState: FavoritesState = {
    breeds: [],
  };
  
  export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
      addFavorite: (state, action: PayloadAction<string>) => {
        state.breeds.push(action.payload);
      },
      removeFavorite: (state, action: PayloadAction<string>) => {
        state.breeds = state.breeds.filter((breed) => breed !== action.payload);
      },
    },
  });
  
  export const { addFavorite, removeFavorite } = favoritesSlice.actions;
  
  export const selectFavorites = (state: RootState) => state.favorites.breeds;
  
  export default favoritesSlice.reducer;