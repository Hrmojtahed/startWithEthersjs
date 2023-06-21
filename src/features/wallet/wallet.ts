import {Wallet} from 'ethers';
import {getProvider} from '../provider/utils';
import {WalletImportEnum, checkSeedPhraseOrPrivateKey} from './utils';
import {Default_Provider} from '../../services/constants';

const provider = getProvider(Default_Provider);

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
