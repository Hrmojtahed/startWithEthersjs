import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {Wallet} from 'ethers';
import {WalletImportEnum, checkSeedPhraseOrPrivateKey} from '../wallet/utils';
import {
  importWalletFromPrivateKey,
  importWalletFromSeedPhrase,
} from '../wallet/wallet';

import {Account} from '../wallet/accounts/type';

export const importWalletApi = createApi({
  reducerPath: 'importWalletApi',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: builder => ({
    getWalletByKey: builder.query<Account, string>({
      queryFn: async (data: string) => {
        try {
          if (data == null || data == '') {
            return {error: {status: 400, data: 'Enter a valid data!!!'}};
          }
          const dataType = checkSeedPhraseOrPrivateKey(data);
          let wallet: Wallet | null;

          if (dataType == WalletImportEnum.Seed) {
            wallet = await importWalletFromSeedPhrase(data);
          } else {
            wallet = await importWalletFromPrivateKey(data);
          }
          if (wallet == null) {
            return {error: {status: 404, data: 'Wallet not found!'}};
          }

          return {data: wallet};
        } catch (e: unknown) {
          return {error: {status: 500, data: e}};
        }
      },
    }),
  }),
});
export const {useGetWalletByKeyQuery, useLazyGetWalletByKeyQuery} =
  importWalletApi;
