import {createSlice} from '@reduxjs/toolkit';

type walletProps = {
  wallet: string[];
  isConnected: boolean;
};
const initialState: walletProps = {
  wallet: [],
  isConnected: false,
};
const walletReducer = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletConnect: (state, action) => {
      state.isConnected = action.payload;
    },
    disconnectWallet: state => {
      state.isConnected = false;
    },
  },
});

export default walletReducer.reducer;

export const {setWalletConnect, disconnectWallet} = walletReducer.actions;
