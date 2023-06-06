import {Wallet} from 'ethers';
import {getProvider} from '../../libs/provider';
import {WalletImportEnum, checkSeedPhraseOrPrivateKey} from './utils';
import {Account} from './accounts/type';

const provider = getProvider();

export async function importWalletFromPrivateKey(
  key: string,
): Promise<Wallet | null> {
  const isValid =
    WalletImportEnum.PrivateKey === checkSeedPhraseOrPrivateKey(key);
  if (!isValid) {
    return null;
  }
  const wallet = new Wallet(key, provider);
  return wallet;
}
export async function importWalletFromSeedPhrase(
  seed: string,
): Promise<Wallet | null> {
  const isValid = WalletImportEnum.Seed === checkSeedPhraseOrPrivateKey(seed);
  if (!isValid) {
    return null;
  }
  const wallet = Wallet.fromMnemonic(seed);
  const connectedWallet = wallet.connect(provider);
  return connectedWallet;
}
