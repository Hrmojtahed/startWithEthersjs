import {Alert, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../utils/styles/color';

import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  removeAllAccounts,
  selectActiveAccount,
  setFinishedOnboarding,
} from '../features/wallet/walletSlice';

import {HomeScreens, Screens} from './Screen';
import Text from '../components/Text/Text';
import AddressDisplay from '../components/AddressDisplay';
import {iconSizes, spacing} from '../utils/styles/sizing';
import TextButton from '../components/Button/TextButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {openModal} from '../app/Modals/modalSlice';
import {ModalName} from '../app/Modals/constants';
import {useGetAccountBalance} from '../features/balance/hooks';
import {GOLD, MATIC} from '../services/constants';
import {ethers} from 'ethers';
import OverlayLoading from '../components/Loading/OverlayLoading';
import {Button} from '../components/Button/Button';
import {Token} from '@uniswap/sdk-core';
import {
  AppStackScreenProp,
  RootStackScreenProp,
  useAppStackNavigation,
} from '../app/navigation/type';

const AngleIcon = (
  <Ionicons
    name="chevron-down-sharp"
    size={iconSizes.icon16}
    color={colors.primary}
  />
);
type Props = RootStackScreenProp<Screens.Home>;
const Home = (props: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectActiveAccount);
  const navigation = useAppStackNavigation();
  const [reloadTrigger, setReloadTrigger] = useState<boolean>(true);

  const [accountBalance, setAccountBalance] = useState<string>('');
  if (!account) {
    dispatch(setFinishedOnboarding(false));
    return <OverlayLoading loading={true} />;
  }
  const {isLoading, balance, error} = useGetAccountBalance(
    MATIC,
    account,
    !reloadTrigger,
  );
  console.log('account', account.accountName, ' ', account.address);
  console.log('isLoading', isLoading);
  console.log('balance', balance);
  console.log('error', error);
  const reloadBalance = () => {
    setReloadTrigger(true);
  };

  const handleOpenModal = () => {
    dispatch(openModal({name: ModalName.AccountModal}));
  };

  if (balance && !isLoading) {
    setAccountBalance(balance);
    setReloadTrigger(false);
  }
  if (error) {
    setReloadTrigger(false);
    console.log('error', error);
  }

  return (
    <View style={styles.container}>
      {isLoading && <OverlayLoading loading={isLoading} />}
      <TextButton
        iconPosition="right"
        iconGap={'spacing2'}
        icon={AngleIcon}
        onPress={handleOpenModal}>
        {account?.accountName}
      </TextButton>
      <AddressDisplay address={account?.address ?? ''} />
      <View style={styles.balanceContainer}>
        <Text variant="body3" style={styles.balanceTitle}>
          Your Balance{' '}
        </Text>
        <Text variant="title1">
          {accountBalance} {'MATIC'}
        </Text>
      </View>
      <Button label="Reload" onPress={reloadBalance} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  balanceContainer: {
    marginTop: spacing.spacing48,
    alignItems: 'center',
  },
  balanceTitle: {
    marginBottom: spacing.spacing8,
  },
});
