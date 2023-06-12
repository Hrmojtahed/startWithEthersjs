import {combineReducers} from '@reduxjs/toolkit';
import walletSlice from '../../features/wallet/walletSlice';
import modalReducer from '../../features/modals/modalSlice';
import balanceReducer from '../../features/balance/balanceSlice';
import {importWalletApi} from '../../features/walletConnect/api';
import {accountBalance} from '../../features/balance/api';

export const rootReducers = combineReducers({
  [importWalletApi.reducerPath]: importWalletApi.reducer,
  [accountBalance.reducerPath]: accountBalance.reducer,
  wallet: walletSlice,
  modals: modalReducer,
  balance: balanceReducer,
});
