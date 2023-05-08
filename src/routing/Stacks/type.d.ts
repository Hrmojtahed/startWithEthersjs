import {ImageRequireSource} from 'react-native';
import {HomeScreens, GalleryScreens, RootScreens} from '../../screens/screen';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  [RootScreens.Root]: undefined;
  [RootScreens.DetailView]: {image: ImageRequireSource};
};

export type RootStackScreenProp<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export const useAppNavigation = (): RootStackNavigationProp =>
  useNavigation<RootStackNavigationProp>();
