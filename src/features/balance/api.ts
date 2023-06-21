import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {Account} from '../wallet/accounts/type';
import {Contract, ethers} from 'ethers';
import {Default_Provider, ERC20_ABI} from '../../services/constants';
import {logger} from '../../utils/logger';
import {getProvider} from '../provider/utils';

type BalanceLookupParams = {
  account: Account;
  currencyIsNative: boolean;
  currencyAddress: string;
};

export const accountBalance = createApi({
  reducerPath: 'balanceApi',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: builder => ({
    balance: builder.query<string | undefined, BalanceLookupParams>({
      queryFn: async (params: BalanceLookupParams) => {
        const {account, currencyAddress, currencyIsNative} = params;
        const {address} = account;

        try {
          if (!account || !currencyAddress)
            return {
              error: {
                status: 400,
                data: 'account or currencyAddress is not defined.',
              },
            };

          if (currencyIsNative) {
            const provider = account.provider;
            const nativeBalance = await provider.getBalance(address);
            const value = ethers.utils.formatEther(nativeBalance);

            return {data: value};
          }
          const provider = getProvider(Default_Provider);
          const contract = new Contract(currencyAddress, ERC20_ABI, provider);
          const balance = await contract.balanceOf?.(address);

          const value = ethers.utils.formatEther(balance);

          return {data: value};
        } catch (e: unknown) {
          return {
            error: {
              status: 500,
              data: e,
            },
          };
        }
      },
    }),
  }),
});

export const {useBalanceQuery} = accountBalance;
