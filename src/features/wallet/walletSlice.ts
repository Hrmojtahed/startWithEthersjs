import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Account} from './accounts/type';
import {Wallet} from 'ethers';

export interface WalletState {
  accounts: Record<Address, Account>;
  walletImported: boolean;
}

const initialState: WalletState = {
  accounts: {},
  walletImported: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Wallet>) => {
      let {address} = action.payload;
      if (state.accounts[address]) {
        throw new Error('This wallet already exist!');
      } else {
        state.accounts[action.payload.address] = action.payload;
        state.walletImported = true;
      }
    },
    removeAccount: (state, action: PayloadAction<Address>) => {
      const address = action.payload;
      if (!state.accounts[address])
        throw new Error(`Cannot remove missing account ${address}`);
      delete state.accounts[address];
      if (Object(state.accounts.length).key().length == 0) {
        state.walletImported = false;
      }
    },
    editAccount: (
      state,
      action: PayloadAction<{address: Address; updatedAccount: Account}>,
    ) => {
      const {address, updatedAccount} = action.payload;

      if (!state.accounts[address])
        throw new Error(`Cannot edit missing account ${address}`);
      state.accounts[address] = updatedAccount;
    },
    removeAllAccount: state => {
      state.accounts = {};
      state.walletImported = false;
    },
  },
});

export const {addAccount, removeAccount, editAccount, removeAllAccount} =
  walletSlice.actions;

export default walletSlice.reducer;
