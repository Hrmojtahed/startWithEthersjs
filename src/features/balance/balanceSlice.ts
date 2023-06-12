import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type InitialStateType = {
  reloadTrigger: boolean;
};

const initialState = {
  reloadTrigger: false,
};

const balanceReducer = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    reloadBalance: state => {
      state.reloadTrigger = !state.reloadTrigger;
    },
  },
});

export default balanceReducer.reducer;
export const {reloadBalance} = balanceReducer.actions;
