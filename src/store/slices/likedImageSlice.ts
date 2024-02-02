import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedImagesState {
  likedImages: Record<string, string[]>; // Use Record<string, string[]> to store liked images for each breed
}

const initialState: LikedImagesState = {
  likedImages: {},
};

const likedImagesSlice = createSlice({
  name: 'likedImages',
  initialState,
  reducers: {
    // Action to add a liked image for a specific breed
    addLikedImage: (state, action: PayloadAction<{ breed: string; image: string }>) => {
      const { breed, image } = action.payload;
      // If the breed doesn't have liked images yet, create an empty array
      if (!state.likedImages[breed]) {
        state.likedImages[breed] = [];
      }
      // Add the image to the liked images for the specified breed
      state.likedImages[breed].push(image);
    },
    // Action to remove a liked image for a specific breed
    removeLikedImage: (state, action: PayloadAction<{ breed: string; image: string }>) => {
      const { breed, image } = action.payload;
      // Filter out the specified image from the liked images for the breed
      state.likedImages[breed] = state.likedImages[breed].filter((likedImage) => likedImage !== image);
      
      if (state.likedImages[breed].length === 0) {
        delete state.likedImages[breed];
      }
    },
  },
});
// the actions and reducer from the likedImagesSlice
export const { addLikedImage, removeLikedImage } = likedImagesSlice.actions;
export default likedImagesSlice.reducer;