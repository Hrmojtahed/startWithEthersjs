import {ethers} from 'ethers';
import {AccountType, WalletConnectAccount} from '../wallet/accounts/type';
import {useAppSelector} from '../../store/hooks';
import {newWalletName} from '../wallet/walletSlice';

export async function exportAccountFromProvider(
  provider: any,
): Promise<WalletConnectAccount> {
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const accounts = await web3Provider.listAccounts();
  const address = accounts[0];

  return {
    type: AccountType.WalletConnect,
    active: true,
    connected: true,
    address,
  };
}
