import {StatusBarStyle, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Home from '../../screens/Home/Home';
import {StatusBar} from 'react-native';

const HStack = createNativeStackNavigator();
type RootStackParamList = {
  HomeScreen: undefined;
};

interface Props {
  navigation: NativeStackScreenProps<RootStackParamList>;
}

const HomeStacks = ({navigation}: Props) => {
  return (
    <HStack.Navigator screenOptions={{headerShown: false}}>
      <HStack.Screen name="HomeScreen" component={Home} />
    </HStack.Navigator>
  );
};

export default HomeStacks;

const styles = StyleSheet.create({});
