import {
  ImageRequireSource,
  StatusBarProps,
  StatusBarStyle,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import ListView from '../../screens/Gallary/ListView';
import DetailView from '../../screens/Gallary/DetailView';
import {StatusBar} from 'react-native';
import {RootStackParamList} from './type';

const GStack = createNativeStackNavigator();

interface Props {
  navigation: NativeStackScreenProps<RootStackParamList>;
}

const GalleryStacks = ({navigation}: Props) => {
  return (
    <GStack.Navigator screenOptions={{headerShown: false}}>
      <GStack.Screen name="ListView" component={ListView} />
    </GStack.Navigator>
  );
};

export default GalleryStacks;

const styles = StyleSheet.create({});
