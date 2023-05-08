import {Button, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {
  RootStackNavigationProp,
  RootStackParamList,
  RootStackScreenProp,
} from '../../routing/Stacks/type';
import Picture from '../../components/Picture/Picture';
import {RootScreens} from '../screen';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from '@react-navigation/native-stack/lib/typescript/src/types';

// type Prop = NativeStackScreenProps<RootStackParamList, RootScreens.DetailView>;

const DetailView = ({
  route,
  navigation,
}: RootStackScreenProp<RootScreens.DetailView>) => {
  // const navigation = useNavigation<RootStackNavigationProp>();
  const {image} = route.params;
  return (
    <View style={styles.container}>
      <Picture source={image} style={styles.img} resizeMode="contain" />
      <Button onPress={() => navigation.pop()} title="Test"></Button>
    </View>
  );
};

export default DetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 300,
  },
});
