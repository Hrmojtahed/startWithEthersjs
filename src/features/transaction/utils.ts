import {Token} from '@uniswap/sdk-core';
import {Contract, Transaction, Wallet, ethers} from 'ethers';
import {logger} from '../../utils/logger';
import {ERC20_ABI} from '../../services/constants';
import {getProvider} from '../../libs/provider';
import {Account} from '../wallet/accounts/type';

const provider = getProvider();

export async function mintToken(
  token: Token,
  amount: string,
  account: Account,
): Promise<Transaction> {
  if (!account._privateKey) {
    throw new Error('Account is not valid.');
  }
  try {
    const wallet = new ethers.Wallet(account._privateKey, provider);

    const contract = new Contract(token.address, ERC20_ABI, wallet);

    const unit256Amount = ethers.utils.parseEther(amount);
    const tx = await contract.mint(unit256Amount);
    await tx.wait();

    logger.debug(
      'transfer/utils',
      'mintToken',
      `\nResult`,
      account._privateKey,
      wallet.address,
      tx,
    );
    return tx;
  } catch (error: unknown) {
    throw new Error('Transaction is not sended!');
  }
}
