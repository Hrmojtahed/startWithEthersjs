import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import Button from '../../components/Button/Button';
import {useAppDispatch} from '../../store/hooks';
import {removeAllAccounts} from '../../features/wallet/walletSlice';
import {useHomeNavigation} from '../../routing/Stacks/type';
import {HomeScreens} from '../screen';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigation = useHomeNavigation();
  const removeAccount = () => {
    dispatch(removeAllAccounts());
    navigation.replace(HomeScreens.Onboarding);
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
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
