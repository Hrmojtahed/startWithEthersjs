import {ethers, providers} from 'ethers';

import {BaseProvider} from '@ethersproject/providers';
import {INFURA_API, ALCHEMY_MUMBAI_API} from '../../services/constants';

const alchemyProvider = new ethers.providers.JsonRpcProvider(
  ALCHEMY_MUMBAI_API,
);

const infuraProvider = new ethers.providers.JsonRpcProvider(INFURA_API);

type ProviderType = 'ALCHEMY' | 'INFURA';
export function getProvider(type: ProviderType): BaseProvider {
  if (type == 'ALCHEMY') {
    return alchemyProvider;
  } else {
    return infuraProvider;
  }
}
