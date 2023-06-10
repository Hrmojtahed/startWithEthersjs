import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppStackScreenProp} from '../../app/navigation/type';
import {Screens} from '../Screen';
import Picture from '../../components/Picture/Picture';

// type Prop = NativeStackScreenProps<RootStackParamList, RootScreens.DetailView>;

const GalleryDetailScreen = ({
  route,
  navigation,
}: AppStackScreenProp<Screens.GalleryDetailScreen>) => {
  // const navigation = useNavigation<RootStackNavigationProp>();
  const {image} = route.params;
  return (
    <View style={styles.container}>
      <Picture source={image} style={styles.img} resizeMode="contain" />
    </View>
  );
};

export default GalleryDetailScreen;

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
