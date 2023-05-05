import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {PropsWithChildren} from 'react';
import Home from '../../screens/Home';
const Stack = createNativeStackNavigator();

function MainStacks(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default MainStacks;

const styles = StyleSheet.create({});
