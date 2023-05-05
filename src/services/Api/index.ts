// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';
import {API_PROVIDER, TEST_ETH_BLOCKCHAIN} from '../constants';

export const provider = new ethers.providers.JsonRpcProvider(
  TEST_ETH_BLOCKCHAIN,
);

export const getBalance = async (address: String) => {
  const balance = await provider.getBalance(address.toString());
  return ethers.utils.formatEther(balance);
};

export const createWallet = async (
  prov: ethers.providers.Provider = provider,
) => {
  const wallet = await ethers.Wallet.createRandom().connect(prov);

  return wallet;
};
