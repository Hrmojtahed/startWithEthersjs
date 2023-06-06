import {StyleSheet, View} from 'react-native';
import React from 'react';
import type {RootStackScreenProp} from '../../routing/Stacks/type';
import Picture from '../../components/Picture/Picture';
import {RootScreens} from '../screen';

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
