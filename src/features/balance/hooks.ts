import type {Token} from '@uniswap/sdk-core';
import type {Account} from '../wallet/accounts/type';
import {useBalanceQuery} from './api';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {getTokenBalanceForAddress} from './utils';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {logger} from '../../utils/logger';
import {reloadBalance} from './balanceSlice';
import {useProvider} from '../provider/hooks';

type BalanceOutput = {
  balance: string | undefined;
  isLoading: boolean;
  error: unknown;
};

export type TokenBalanceItemType = {
  token: Token;
  balance: string;
};

type ListOfBalanceType = {
  balances: TokenBalanceItemType[];
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
};

export function useGetAccountBalance(
  currency: Token,
  account: Account,
  skip?: boolean,
): BalanceOutput {
  const {data, error, isLoading} = useBalanceQuery(
    {
      account,
      currencyAddress: currency.address,
      currencyIsNative: currency.isNative,
    },
    {skip: skip},
  );

  return useMemo(
    () => ({
      balance: currency && data ? data : undefined,
      isLoading,
      error,
    }),
    [data, currency, isLoading, error],
  );
}

// export function useGetBalanceOfTokenList(
//   currencyList: Token[],
//   account: Account,
//   reload: boolean,
// ): ListOfBalanceType {
//   const [isLoading, setIsLoading] = useState(false);
//   const [balances, setBalances] = useState<TokenBalanceItemType[]>([]);
//   useEffect(() => {
//     const getBalance = async () => {
//       setIsLoading(true);
//       const newBalances: TokenBalanceItemType[] = [];

//       for (const currency of currencyList) {
//         const value = await getTokenBalanceForAddress(
//           currency,
//           account.address,
//         );
//         newBalances.push({
//           token: currency,
//           balance: value,
//         });
//       }

//       setBalances(newBalances);
//       setIsLoading(false);
//     };

//     getBalance();
//   }, [currencyList, account, reload]);

//   return {
//     isLoading,
//     balances,
//   };
// }

export function useGetBalanceOfTokenList(
  currencyList: Token[],
  account: Account,
): ListOfBalanceType {
  const [isLoading, setIsLoading] = useState(false);
  const [balances, setBalances] = useState<TokenBalanceItemType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {provider} = useProvider();

  const reloadTrigger = useAppSelector(state => state.balance.reloadTrigger);

  const getBalance = useCallback(async () => {
    setIsLoading(true);
    let list: TokenBalanceItemType[] = [];

    for (let i = 0; i < currencyList.length; i++) {
      const currency = currencyList[i];
      const balance = await getTokenBalanceForAddress(
        currency,
        account.address,
        provider,
      );

      list.push({
        token: currency,
        balance: balance,
      });
    }
    setBalances(list);
    setIsLoading(false);
    setRefreshing(false);
  }, [currencyList, account]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBalance();
    if (reloadTrigger) {
      dispatch(reloadBalance());
    }
  }, [reloadTrigger]);

  useEffect(() => {
    if (reloadTrigger) {
      logger.debug(
        'balance/hooks',
        'useGetBalanceOfTokenList',
        '\nsilent Reload!',
      );
      onRefresh();
    }
  }, [getBalance, onRefresh]);

  useEffect(() => {
    getBalance();
  }, []);

  return {
    isLoading,
    balances,
    refreshing,
    onRefresh,
  };
}
