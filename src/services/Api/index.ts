// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';
import {getProvider} from '../../features/provider/utils';
import {Default_Provider} from '../constants';

export const provider = getProvider(Default_Provider);

export const getBalance = async (address: String) => {
  const balance = await provider.getBalance(address.toString());
  return ethers.utils.formatEther(balance);
};

export const createWallet = async (
  prov: ethers.providers.Provider = provider,
) => {
  const wallet = ethers.Wallet.createRandom().connect(prov);

  return wallet;
};
