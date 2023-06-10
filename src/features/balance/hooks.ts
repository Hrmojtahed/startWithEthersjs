import type {Token} from '@uniswap/sdk-core';
import type {Account} from '../wallet/accounts/type';
import {useBalanceQuery} from './api';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {getTokenBalanceForAddress} from './utils';

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

  const getBalance = useCallback(async () => {
    setIsLoading(true);
    let list: TokenBalanceItemType[] = [];

    for (let i = 0; i < currencyList.length; i++) {
      const currency = currencyList[i];
      const balance = await getTokenBalanceForAddress(
        currency,
        account.address,
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

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const onRefresh = () => {
    setRefreshing(true);

    getBalance();
  };

  return {
    isLoading,
    balances,
    refreshing,
    onRefresh,
  };
}
