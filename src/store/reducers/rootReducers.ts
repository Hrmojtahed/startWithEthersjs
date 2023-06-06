import {combineReducers} from '@reduxjs/toolkit';
import walletSlice from '../../features/wallet/walletSlice';
import {importWalletApi} from '../../features/walletConnect/api';
import modalSlice from '../../app/Modals/modalSlice';

export const rootReducers = combineReducers({
  [importWalletApi.reducerPath]: importWalletApi.reducer,
  wallet: walletSlice,
  modals: modalSlice,
});
