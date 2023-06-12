import {ethers, Transaction} from 'ethers';

export enum TransactionType {
  Normal = 'normal',
  MintToken = 'mintToken',
}

export interface TransactionState extends Transaction {
  transactionType?: TransactionType;
}
