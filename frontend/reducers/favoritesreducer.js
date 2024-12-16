import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { word: []},
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
	console.log(action.payload, 'hemmp')
      state.value.word.push(action.payload)
    },
  },
});

export const { addFavorite } = favoriteSlice.actions; 
export default favoriteSlice.reducer; 
