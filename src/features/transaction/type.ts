import {ethers, Transaction} from 'ethers';

export enum TransactionType {
  NormalTransaction = 'normal',
  MintToken = 'mintToken',
}

export interface TransactionState extends Transaction {
  transactionType?: TransactionType;
}
