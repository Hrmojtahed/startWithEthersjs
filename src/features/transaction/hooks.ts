import {Token} from '@uniswap/sdk-core';
import {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectActiveAccount} from '../wallet/walletSlice';
import {TransactionState, TransactionType} from './type';
import {mintToken} from './utils';
import {Contract, Transaction, ethers} from 'ethers';
import {getProvider} from '../../libs/provider';
import {ERC20_ABI} from '../../services/constants';
import {reloadBalance} from '../balance/balanceSlice';
import {closeModal, openModal} from '../modals/modalSlice';
import {ModalName} from '../../app/Modals/constants';

type MintFunctionType = {
  isLoading: boolean;
  isSuccess: boolean;
  transaction: TransactionState | undefined;
  onMint: () => void;
};

type Props = {
  token: Token;
  amount: string;
};
const provider = getProvider();
export function useMintToken({token, amount}: Props): MintFunctionType {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transaction, setTransaction] = useState<TransactionState>();

  const account = useAppSelector(selectActiveAccount);
  const wallet = new ethers.Wallet(account._privateKey, provider);
  const contract = new Contract(token.address, ERC20_ABI, wallet);

  const _mint = async (): Promise<Transaction> => {
    const unit256Amount = ethers.utils.parseEther(amount);
    const tx = await contract.mint(unit256Amount);
    await tx.wait();
    return tx;
  };

  const onMint = useCallback(async () => {
    try {
      setIsSuccess(false);
      setIsLoading(true);

      const tx = await _mint();

      let result = {
        ...tx,
        transactionType: TransactionType.MintToken,
      };
      setIsLoading(false);
      setTransaction(result);
    } catch (error: unknown) {
      throw new Error('Mint function accoured error.');
    }
  }, [token, amount]);

  useEffect(() => {
    const logEvent = (from: string, to: string, amount: string): void => {
      console.log('Transaction successful.');
      console.log('from: ', from);
      console.log('to: ', to);
      console.log('amount: ', ethers.utils.formatEther(amount));
      setIsSuccess(true);
    };

    contract.on('Transfer', logEvent);
    return () => {
      contract.off('Transfer', logEvent);
      setTransaction(undefined);
    };
  }, [onMint]);

  return {
    isLoading,
    isSuccess,
    transaction,
    onMint,
  };
}
