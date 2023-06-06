// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';
import {API_PROVIDER, TEST_ETH_BLOCKCHAIN} from '../constants';
import {getProvider} from '../../libs/provider';

export const provider = getProvider();

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
