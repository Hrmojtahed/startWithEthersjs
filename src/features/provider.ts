import {ethers, providers} from 'ethers';
import {ALCHEMY_API} from '../utils/config';
import {BaseProvider} from '@ethersproject/providers';

const alchemyProvider = new ethers.providers.JsonRpcProvider(ALCHEMY_API);

export function getProvider(): providers.Provider | null {
  return alchemyProvider;
}
