import type {Token} from '@uniswap/sdk-core';
import type {Account} from '../wallet/accounts/type';
import {useBalanceQuery} from './api';
import {useMemo} from 'react';

type BalanceOutput = {
  balance: string | undefined;
  isLoading: boolean;
  error: unknown;
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
