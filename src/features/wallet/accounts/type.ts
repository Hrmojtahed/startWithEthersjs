import {Wallet, ethers} from 'ethers';

export enum AccountType {
  Import = 'import',
  WalletConnect = 'walletConnect',
}

export type AccountBase = {
  name?: string;
  address: string;
  type: AccountType;
  connected: boolean;
  active: boolean;
};

export interface ImportAccount extends AccountBase {
  type: AccountType.Import;
  _privateKey: ethers.utils.BytesLike;
}

export interface WalletConnectAccount extends AccountBase {
  type: AccountType.WalletConnect;
}

export type Account = ImportAccount | WalletConnectAccount;
