import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: { words: []},
};

export const favoriteSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		getFavorites: (state, action) => {
			state.value.words = action.payload;
		},
		findFavorite: (state, action) => {
			state.value.words.find(action.payload) 
		},
		deleteFavorite: (state, action) => {
            state.value.words.filter(
                (e) => e !== action.payload)
		}
	},
});

export const { getFavorites, findFavorite, deleteFavorite } = favoriteSlice.actions;
export default userSlice.reducer;

