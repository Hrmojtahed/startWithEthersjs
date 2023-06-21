import {Token} from '@uniswap/sdk-core';
import {getProvider} from '../provider/utils';
import {Contract, ethers, providers} from 'ethers';
import {Default_Provider, ERC20_ABI} from '../../services/constants';
import {Provider} from '../provider/hooks';

export async function getTokenBalanceForAddress(
  token: Token,
  address: Address,
  provider: providers.Provider,
): Promise<string> {
  const contract = new Contract(token.address, ERC20_ABI, provider);
  const unit256Balance = await contract?.balanceOf(address);

  return ethers.utils.formatEther(unit256Balance);
}
