import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import Button from '../../components/Button/Button';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  removeAllAccounts,
  selectActiveAccount,
} from '../../features/wallet/walletSlice';
import {useHomeNavigation} from '../../routing/Stacks/type';
import {HomeScreens} from '../screen';
import Text from '../../components/Text/Text';
import AddressDisplay from '../../components/AddressDisplay';
import {spacing} from '../../utils/styles/sizing';

const Home = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectActiveAccount);
  const navigation = useHomeNavigation();
  const removeAccount = () => {
    dispatch(removeAllAccounts());
    navigation.replace(HomeScreens.Onboarding);
  };
  return (
    <View style={styles.container}>
      <Text variant="title2">{account.accountName}</Text>
      <AddressDisplay address={account.address} />
      <View style={styles.balanceContainer}>
        <Text variant="body3" style={styles.balanceTitle}>
          Your Balance{' '}
        </Text>
        <Text variant="title1">0.3242343 {'MATIC'}</Text>
      </View>
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
