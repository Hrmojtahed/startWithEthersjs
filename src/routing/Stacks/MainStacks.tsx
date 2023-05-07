import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {PropsWithChildren} from 'react';
import Home from '../../screens/Home/Home';
import MainBottomTab from '../BottomTab/MainBottomTab';
import DetailView from '../../screens/Gallary/DetailView';
import {colors} from '../../utils/styles/color';
const Stack = createNativeStackNavigator();

function MainStacks(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}>
      <Stack.Screen
        name="Root"
        component={MainBottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailView"
        component={DetailView}
        options={{title: 'Gallery', presentation: 'card'}}
      />
    </Stack.Navigator>
  );
}

export default MainStacks;

const styles = StyleSheet.create({});
