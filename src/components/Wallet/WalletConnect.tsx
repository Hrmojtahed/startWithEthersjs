import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  WALLETCONNECT_PROJECT_ID,
  providerMetadata,
  sessionParams,
} from '../../utils/config';
import {Web3Modal, useWeb3Modal} from '@web3modal/react-native';
import {logger} from '../../utils/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  removeAccount,
  selectActiveAccount,
} from '../../features/wallet/walletSlice';
import {AccountType} from '../../features/wallet/accounts/type';
type Props = {
  children: React.ReactNode;
};
const WalletConnect = ({children}: Props): JSX.Element => {
  const {isConnected, provider} = useWeb3Modal();

  const ActiveAccount = useAppSelector(selectActiveAccount);
  const isWalletExist = useAppSelector(state => state.wallet.isWalletExist);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   logger.debug(
  //     'WalletConnect',
  //     'onMount',
  //     'WC status : ',
  //     isConnected,
  //     typeof provider,
  //   );
  //   if (
  //     !isConnected &&
  //     isWalletExist &&
  //     ActiveAccount?.type == AccountType.WalletConnect
  //   ) {
  //     logger.debug(
  //       'WalletConnect',
  //       'onMount',
  //       'account status : ',
  //       ActiveAccount.address,
  //       isWalletExist,
  //     );
  //     dispatch(removeAccount(ActiveAccount.address));
  //     //Todo : you must deactive account when disconnected WC connection.
  //   }
  // }, [isConnected, provider, ActiveAccount, isWalletExist]);

  return (
    <>
      {children}
      <Web3Modal
        projectId={WALLETCONNECT_PROJECT_ID}
        providerMetadata={providerMetadata}
        sessionParams={sessionParams}
      />
    </>
  );
};

export default WalletConnect;

const styles = StyleSheet.create({});
