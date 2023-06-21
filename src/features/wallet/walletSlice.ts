import {PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import {Account, AccountType} from './accounts/type';
import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';

export interface WalletState {
  accounts: Record<Address, Account>;
  importedId: number;
  activeAccount: Address;
  finishedOnboarding: boolean;
  isWalletExist: boolean;
}

const initialState: WalletState = {
  accounts: {},
  importedId: 0,
  activeAccount: '',
  finishedOnboarding: false,
  isWalletExist: false,
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
        state.accounts[address] = action.payload;
        state.accounts[address].name = `Wallet ${state.importedId + 1}`;
        state.accounts[address].active = true;

        // add to activate address
        state.activeAccount = address;
        state.importedId += 1;
        state.isWalletExist = true;
      }
    },
    removeAccount: (state, action: PayloadAction<Address>) => {
      const address = action.payload;
      if (!state.accounts[address]) {
        throw new Error(`Cannot remove missing account ${address}`);
      }
      delete state.accounts[address];

      if (Object.keys(state.accounts).length == 0) {
        state.activeAccount = '';
        state.finishedOnboarding = false;
        state.isWalletExist = false;
      } else {
        const firstAddressAfterDelete = Object.keys(state.accounts)[0];
        state.activeAccount = firstAddressAfterDelete;
        state.isWalletExist = true;
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
      state.activeAccount = '';
      state.importedId = 0;
      state.isWalletExist = false;
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
  return wallet.accounts[address];
});

export const newWalletName = createSelector(selectedWallet, wallet => {
  //returns wallet name for new accounts
  const id = wallet.importedId;
  return `Wallet ${id}`;
});
