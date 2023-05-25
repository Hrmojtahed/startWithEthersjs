import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GalleryStacks from '../Stacks/GalleryStacks';
import HomeStacks from '../Stacks/HomeStacks';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../utils/styles/color';

const Tab = createBottomTabNavigator();

const MainBottomTab = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
      }}>
      <Tab.Screen
        name="Gallery"
        component={GalleryStacks}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'images' : 'images-outline'}
              size={size}
              color={color}
            />
          ),
          headerTitleStyle: {
            color: colors.white,
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="Home"
        component={HomeStacks}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          headerTitleStyle: {
            color: colors.primary,
          },
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerShown: false,
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainBottomTab;

const styles = StyleSheet.create({});
