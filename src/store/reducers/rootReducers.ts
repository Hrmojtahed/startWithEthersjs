import {combineReducers} from '@reduxjs/toolkit';
import walletSlice from '../../features/wallet/walletSlice';
import {importWalletApi} from '../../features/walletConnect/api';
import modalReducer from '../../features/modals/modalSlice';
import {accountBalance} from '../../features/balance/api';

export const rootReducers = combineReducers({
  [importWalletApi.reducerPath]: importWalletApi.reducer,
  [accountBalance.reducerPath]: accountBalance.reducer,
  wallet: walletSlice,
  modals: modalReducer,
});
