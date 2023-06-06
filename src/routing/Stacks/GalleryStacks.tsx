import {StyleSheet} from 'react-native';
import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import ListView from '../../screens/Gallary/ListView';
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
