import {BaseProvider} from '@ethersproject/providers';
import {useWeb3Modal} from '@web3modal/react-native';
import {ethers, providers} from 'ethers';
import {useCallback, useMemo} from 'react';
import {ALCHEMY_MUMBAI_API} from '../../services/constants';
type ProviderType = 'WalletConnect' | 'RPC';
export type Provider = {
  provider: providers.JsonRpcProvider | providers.Web3Provider;
  type: ProviderType;
  isConnectedWC: boolean;
};
export function useProvider(): Provider {
  const {isConnected, provider: walletConnectProvider} = useWeb3Modal();
  return useMemo((): Provider => {
    if (isConnected && walletConnectProvider) {
      return {
        provider: new ethers.providers.Web3Provider(walletConnectProvider),
        type: 'WalletConnect',
        isConnectedWC: isConnected,
      };
    } else {
      return {
        provider: new ethers.providers.JsonRpcProvider(ALCHEMY_MUMBAI_API),
        type: 'RPC',
        isConnectedWC: isConnected,
      };
    }
  }, [isConnected, walletConnectProvider]);
}
