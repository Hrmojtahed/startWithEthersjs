import {ImageRequireSource} from 'react-native';
import {HomeScreens, GalleryScreens, RootScreens} from '../../screens/screen';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  [RootScreens.Root]: undefined;
  [RootScreens.DetailView]: {image: ImageRequireSource};
};

export type HomeStackParamList = {
  [HomeScreens.Home]: undefined;
};
export type RootStackScreenProp<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type HomeStackScreenProp<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>;

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type HomeStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  RootStackNavigationProp
>;

export const useAppNavigation = (): RootStackNavigationProp =>
  useNavigation<RootStackNavigationProp>();

export const useHomeNavigation = (): HomeStackNavigationProp =>
  useNavigation<HomeStackNavigationProp>();
