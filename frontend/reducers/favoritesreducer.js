import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    value: [] ,
  },
  reducers: {
    setFavorites: (state, action) => {
      state.value.push(action.payload);
    },
    addFavorite: (state, action) => {
      console.log(action.payload, 'action reducer');
      state.value.push(action.payload);
    },
    deleteFavorite: (state, action) => {
      state.value = state.value.filter((e) => e._id !== action.payload);
      
    },
  },
});

export const { setFavorites, addFavorite, deleteFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
