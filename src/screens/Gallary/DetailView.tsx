import {ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routing/Stacks/type';
import Picture from '../../components/Picture/Picture';

interface detailProps {
  route: NativeStackScreenProps<RootStackParamList, 'DetailView', undefined>;
}

const DetailView = ({route}: detailProps) => {
  const {image} = route.params;

  return (
    <View style={styles.container}>
      <Picture source={image} style={styles.img} resizeMode="contain" />
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
    height: '100%',
  },
});
