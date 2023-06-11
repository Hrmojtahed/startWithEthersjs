import {ethers, providers} from 'ethers';
import {ALCHEMY_API} from '../utils/config';
import {BaseProvider} from '@ethersproject/providers';

const alchemyProvider = new ethers.providers.JsonRpcProvider(
  ALCHEMY_API,
  'maticmum',
);

export function getProvider(): BaseProvider {
  return alchemyProvider;
}
