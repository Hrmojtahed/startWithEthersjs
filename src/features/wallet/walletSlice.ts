import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {Account} from './accounts/type';
import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';

export interface WalletState {
  accounts: Record<Address, Account>;
  walletImported: boolean;
  importedId: number;
  activeAccount: Address;
  finishedOnboarding: boolean;
}

const initialState: WalletState = {
  accounts: {},
  walletImported: false,
  importedId: 0,
  activeAccount: '',
  finishedOnboarding: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      let {address} = action.payload;
      if (state.accounts[address]) {
        throw new Error('This wallet already exist!');
      } else {
        state.accounts[action.payload.address] = action.payload;
        state.accounts[action.payload.address]._privateKey =
          action.payload.privateKey;
        state.accounts[action.payload.address].accountName = `Account ${
          state.importedId + 1
        }`;

        state.activeAccount = address;
        state.walletImported = true;
        state.importedId++;
      }
    },
    removeAccount: (state, action: PayloadAction<Address>) => {
      const address = action.payload;
      if (!state.accounts[address]) {
        throw new Error(`Cannot remove missing account ${address}`);
      }
      delete state.accounts[address];
      if (Object.keys(state.accounts).length == 0) {
        state.walletImported = false;
        state.activeAccount = '';
      } else {
        const firstAddressAfterDelete = Object.keys(state.accounts)[0];
        state.activeAccount = firstAddressAfterDelete;
      }
    },
    editAccount: (
      state,
      action: PayloadAction<{address: Address; updatedAccount: Account}>,
    ) => {
      const {address, updatedAccount} = action.payload;

      if (!state.accounts[address]) {
        throw new Error(`Cannot edit missing account ${address}`);
      }
      state.accounts[address] = updatedAccount;
    },
    removeAllAccounts: state => {
      state.accounts = {};
      state.walletImported = false;
      state.activeAccount = '';
      state.importedId = 0;
    },
    setFinishedOnboarding: (state, action: PayloadAction<boolean>) => {
      state.finishedOnboarding = action.payload;
    },
  },
});

export const {
  addAccount,
  removeAccount,
  editAccount,
  removeAllAccounts,
  setFinishedOnboarding,
} = walletSlice.actions;

export default walletSlice.reducer;

const selectedWallet = (state: RootState) => state.wallet;

export const selectActiveAccount = createSelector(selectedWallet, wallet => {
  const address = wallet.activeAccount;

  if (wallet.accounts[address]) {
    return wallet.accounts[address];
  } else {
    throw new Error('Account is not exist.');
  }
});
