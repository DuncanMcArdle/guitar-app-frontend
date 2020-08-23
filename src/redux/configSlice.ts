import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	chords: '-1',
	showChord: '-1',
	initialCountdown: 3,
	timePerChord: 10,
	duration: 5,
};

const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		setConfig: (state, action) => {
			state.chords = 				action.payload.chords;
			state.showChord = 			action.payload.showChord;
			state.initialCountdown =	action.payload.initialCountdown;
			state.timePerChord =		action.payload.timePerChord;
			state.duration = 			action.payload.duration;
		},
	},
});

export const { setConfig } = configSlice.actions;

export default configSlice.reducer;
