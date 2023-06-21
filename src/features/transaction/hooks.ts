import {Token} from '@uniswap/sdk-core';
import {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectActiveAccount} from '../wallet/walletSlice';
import {TransactionState, TransactionType} from './type';
import {mintToken} from './utils';
import {Contract, Signer, Transaction, ethers} from 'ethers';
import {getProvider} from '../provider/utils';
import {Default_Provider, ERC20_ABI} from '../../services/constants';
import {reloadBalance} from '../balance/balanceSlice';
import {closeModal, openModal} from '../modals/modalSlice';
import {ModalName} from '../../app/Modals/constants';
import {logger} from '../../utils/logger';
import {AccountType} from '../wallet/accounts/type';
import {useProvider} from '../provider/hooks';

type MintFunctionType = {
  isLoading: boolean;
  isSuccess: boolean;
  transaction: TransactionState | undefined;
  onMint: () => void;
  error: string | undefined;
};
type TransferFunctionType = {
  isLoading: boolean;
  isSuccess: boolean;
  transaction: TransactionState | undefined;
  error: string | undefined;
  transferToken: () => void;
};

type Props = {
  token: Token;
  amount: string;
  recieverAddress?: string;
};
export function useMintToken({token, amount}: Props): MintFunctionType {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transaction, setTransaction] = useState<TransactionState>();
  const [error, setError] = useState<string | undefined>(undefined);
  const {type, provider} = useProvider();
  let signer: Signer;
  const account = useAppSelector(selectActiveAccount);

  if (account.type == AccountType.Import) {
    signer = new ethers.Wallet(account._privateKey, provider);
  } else {
    signer = provider.getSigner();
  }

  const contract = new Contract(token.address, ERC20_ABI, signer);

  const _mint = async (): Promise<Transaction> => {
    const unit256Amount = ethers.utils.parseEther(amount);
    // const transaction = {
    //   to: await signer.getAddress(),
    //   value: unit256Amount,
    // };

    const tx = await contract.mint(unit256Amount);
    // const tx = await signer.sendTransaction(transaction);
    // await tx.wait();
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
      logger.debug(
        'transaction/hooks',
        'onMint',
        'Mint token successfuly!',
        tx.hash,
      );
      setIsSuccess(true);
      setTransaction(result);
      setError(undefined);
    } catch (error: any) {
      setIsSuccess(false);
      setError(error.message);
      logger.debug('transaction/hooks', 'onMint', 'Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token, amount]);

  // useEffect(() => {
  //   const logEvent = (from: string, to: string, amount: string): void => {
  //     console.log('Transaction successful.');
  //     // console.log('from: ', from);
  //     // console.log('to: ', to);
  //     // console.log('amount: ', ethers.utils.formatEther(amount));
  //     setIsSuccess(true);
  //   };

  //   contract.on('Transfer', logEvent);
  //   return () => {
  //     contract.off('Transfer', logEvent);
  //     // setTransaction(undefined);
  //   };
  // }, [onMint]);

  return {
    isLoading,
    isSuccess,
    transaction,
    error,
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
  const [error, setError] = useState<string | undefined>(undefined);

  const account = useAppSelector(selectActiveAccount);

  const {type, provider} = useProvider();
  let signer: Signer;

  if (account.type == AccountType.Import) {
    signer = new ethers.Wallet(account._privateKey, provider);
  } else {
    signer = provider.getSigner();
  }

  const contract = new Contract(token.address, ERC20_ABI, signer);

  const _send = async (): Promise<Transaction> => {
    const {chainId} = await provider.getNetwork();
    const unit256Amount = ethers.utils.parseUnits(amount, token.decimals);
    console.log('decimals', token.decimals);
    console.log('address', recieverAddress);
    console.log('amount', amount, unit256Amount);
    const transaction = {
      to: recieverAddress,
      value: unit256Amount,
      chainId,
    };

    // Send the transaction using the signer
    const txResponse = await signer.sendTransaction(transaction);

    return txResponse;
  };

  const transferToken = useCallback(async () => {
    try {
      setIsSuccess(false);
      setIsLoading(true);
      setError(undefined);

      const tx = await _send();
      console.log('tx', tx);

      let result = {
        ...tx,
        transactionType: TransactionType.NormalTransaction,
      };

      setIsSuccess(true);
      setTransaction(result);
    } catch (error: any) {
      setIsSuccess(false);
      setError(error.message);
      setIsLoading(false);
      logger.debug(
        'transfer/hooks',
        'TransferToken',
        'Error',
        error,
        error.message,
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, amount, recieverAddress]);

  // useEffect(() => {
  //   const logEvent = (from: string, to: string, amount: string): void => {
  //     console.log('Transaction successful.');
  //     console.log('from: ', from);
  //     console.log('to: ', to);
  //     console.log('amount: ', ethers.utils.formatEther(amount));
  //     setIsSuccess(true);
  //   };

  //   contract.on('Transfer', logEvent);
  //   return () => {
  //     contract.off('Transfer', logEvent);
  //     setTransaction(undefined);
  //   };
  // }, [transferToken]);

  return {
    error,
    isLoading,
    isSuccess,
    transaction,
    transferToken,
  };
}
