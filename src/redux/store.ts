import { configureStore } from '@reduxjs/toolkit';
import configReducer from './configSlice';
import authReducer from './authSlice';

const store = configureStore({
	reducer: {
		config: configReducer,
		auth: authReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
