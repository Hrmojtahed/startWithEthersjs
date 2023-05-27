import {StatusBarStyle, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Home from '../../screens/Home/Home';
import {StatusBar} from 'react-native';
import {HomeScreens} from '../../screens/screen';
import {HomeStackParamList, HomeStackScreenProp} from './type';
import WalletPage from '../../screens/Home/Wallet';

const HStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStacks = () => {
  return (
    <HStack.Navigator
      screenOptions={{headerShown: true}}
      initialRouteName={HomeScreens.Home}>
      <HStack.Screen name={HomeScreens.Home} component={Home} />
    </HStack.Navigator>
  );
};

export default HomeStacks;

const styles = StyleSheet.create({});
