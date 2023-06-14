import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TransactionState} from './type';

type TransactionInitialStateProps = {
  transactions: TransactionState[];
};

const initialState: TransactionInitialStateProps = {
  transactions: [],
};

const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionState>) => {
      state.transactions.push(action.payload);
    },
    transactionsQueue: (state, action: PayloadAction<TransactionState>) => {},
    deleteTransaction: (state, action: PayloadAction<{hash: string}>) => {},
    deleteAllTransactions: state => {},
  },
});

export default transactionReducer.reducer;

export const {
  addTransaction,
  transactionsQueue,
  deleteTransaction,
  deleteAllTransactions,
} = transactionReducer.actions;
