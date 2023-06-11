import {Wallet, ethers} from 'ethers';

type AccountBase = {
  accountName?: string;
  _privateKey?: ethers.utils.BytesLike;
};

export type Account = Wallet & AccountBase;
