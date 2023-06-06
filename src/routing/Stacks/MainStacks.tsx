import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import type {PropsWithChildren} from 'react';
import Onboarding from '../../screens/Home/Onboarding';
import MainBottomTab from '../BottomTab/MainBottomTab';
import DetailView from '../../screens/Gallary/DetailView';
import {colors} from '../../utils/styles/color';
import {RootStackParamList} from './type';
import {RootScreens} from '../../screens/screen';
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStacks(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}>
      <Stack.Screen
        name={RootScreens.Root}
        component={MainBottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RootScreens.DetailView}
        component={DetailView}
        options={{title: 'Gallery', presentation: 'card'}}
      />
    </Stack.Navigator>
  );
}

export default MainStacks;

const styles = StyleSheet.create({});
