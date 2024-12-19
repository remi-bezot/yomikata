import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: { lesson : null , key : null },
};

export const continueSlice = createSlice({
	name: "continues",
	initialState,
	reducers: {
		getContinue: (state, action) => {
			state.value.lesson = action.payload.lesson;
            state.value.key = action.payload.key;
		},
	},
});

export const {getContinue} = continueSlice.actions;
export default continueSlice.reducer;