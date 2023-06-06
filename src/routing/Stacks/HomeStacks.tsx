import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../../screens/Home/Onboarding';

import {HomeScreens} from '../../screens/screen';
import {HomeStackParamList} from './type';
import {useAppSelector} from '../../store/hooks';
import Home from '../../screens/Home/Home';

const HStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStacks = () => {
  const isImportedWallet = useAppSelector(state => state.wallet.walletImported);
  return (
    <HStack.Navigator
      screenOptions={{headerShown: true, title: 'Wallet'}}
      initialRouteName={
        isImportedWallet ? HomeScreens.Home : HomeScreens.Onboarding
      }>
      <HStack.Screen name={HomeScreens.Onboarding} component={Onboarding} />
      <HStack.Screen name={HomeScreens.Home} component={Home} />
    </HStack.Navigator>
  );
};

export default HomeStacks;

const styles = StyleSheet.create({});
