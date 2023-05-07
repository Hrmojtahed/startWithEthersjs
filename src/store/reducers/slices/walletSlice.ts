import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';

type walletProps = {
  wallet: string[];
};
const initialState: walletProps = {
  wallet: [],
};
const walletReducer = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
});

export default walletReducer.reducer;
