import {Token} from '@uniswap/sdk-core';
import {getProvider} from '../../libs/provider';
import {Contract, ethers} from 'ethers';
import {ERC20_ABI} from '../../services/constants';

const provider = getProvider();

export async function getTokenBalanceForAddress(
  token: Token,
  address: Address,
): Promise<string> {
  const contract = new Contract(token.address, ERC20_ABI, provider);
  const unit256Balance = await contract?.balanceOf(address);

  return ethers.utils.formatEther(unit256Balance);
}
