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
import {logger} from '../../utils/logger';

type MintFunctionType = {
  isLoading: boolean;
  isSuccess: boolean;
  transaction: TransactionState | undefined;
  onMint: () => void;
};
type TransferFunctionType = {
  isLoading: boolean;
  isSuccess: boolean;
  transaction: TransactionState | undefined;

  transferToken: () => void;
};

type Props = {
  token: Token;
  amount: string;
  recieverAddress?: string;
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
      setIsLoading(false);
      setIsSuccess(false);
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

export function useTransferToken({
  token,
  amount,
  recieverAddress,
}: Props): TransferFunctionType {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transaction, setTransaction] = useState<
    TransactionState | undefined
  >();

  const account = useAppSelector(selectActiveAccount);
  const wallet = new ethers.Wallet(account._privateKey, provider);

  const contract = new Contract(token.address, ERC20_ABI, wallet);

  const _send = async (): Promise<Transaction> => {
    const unit256Amount = ethers.utils.parseUnits(amount, token.decimals);
    console.log('decimals', token.decimals);
    console.log('address', recieverAddress);
    console.log('amount', amount, unit256Amount);
    const tx = await contract.transfer(recieverAddress, unit256Amount);
    await tx.wait();
    return tx;
  };

  const transferToken = useCallback(async () => {
    try {
      setIsSuccess(false);
      setIsLoading(true);

      const tx = await _send();

      let result = {
        ...tx,
        transactionType: TransactionType.NormalTransaction,
      };
      setIsLoading(false);
      setIsSuccess(true);
      setTransaction(result);
    } catch (error: unknown) {
      setIsLoading(false);
      setIsSuccess(false);
      logger.debug('transfer/hooks', 'TransferToken', 'Error', error);
      throw new Error('Transfer function accoured error.');
    }
  }, [token, amount, recieverAddress]);

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
  }, [transferToken]);

  return {
    isLoading,
    isSuccess,
    transaction,
    transferToken,
  };
}
