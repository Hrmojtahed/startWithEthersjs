import {combineReducers} from '@reduxjs/toolkit';
import walletSlice from './slices/walletSlice';

export const rootReducers = combineReducers({
  wallet: walletSlice,
});
