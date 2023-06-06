import {Wallet} from 'ethers';

type AccountBase = {
  accountName?: string;
};

export type Account = Wallet & AccountBase;
