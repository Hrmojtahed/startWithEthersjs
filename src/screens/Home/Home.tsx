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
      <Text variant="subtitle2" numberOfLines={1}>
        {account.address}
      </Text>
      <Button text="Delete Account" onPress={removeAccount} />
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
});
