import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    number: 0,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    increase: state => {
        state.number += 1;
    },
    decrease: state => {
        state.number -= 1
    },
    setConfig: (state, action) => {
      state = action.payload;
    },
  },
})

export const { increase, decrease, setConfig } = configSlice.actions;


export const getConfig = state => state.config;
export const getCount = 1;

export default configSlice.reducer
