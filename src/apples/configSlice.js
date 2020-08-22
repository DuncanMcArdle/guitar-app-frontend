import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	initialCountdown: null,
	timePerChord: null,
	duration: null,
};

const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		setConfig: (state, action) => {
			state.initialCountdown = action.payload.initialCountdown;
			state.timePerChord = action.payload.timePerChord;
			state.duration = action.payload.duration;
		},
	},
});

export const { setConfig } = configSlice.actions;

export default configSlice.reducer;
