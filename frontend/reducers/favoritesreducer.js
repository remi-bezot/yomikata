import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { word: [], jlpt: [], grammar: [] },
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.value.word.push(action.payload.word);
      state.value.jlpt.push(action.payload.jlpt);
      state.value.grammar.push(action.payload.grammar);
    },
  },
});

export const { addFavorite } = favoriteSlice.actions; 
export default favoriteSlice.reducer; 
