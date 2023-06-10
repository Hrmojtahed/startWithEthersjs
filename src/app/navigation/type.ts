import {
  CompositeScreenProps,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {Screens, Tabs} from '../../screens/Screen';
import {ImageRequireSource} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps,
  NativeStackScreenProps,
} from '@react-navigation/native-stack/lib/typescript/src/types';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type GalleryStackParamList = {
  [Screens.GalleryListScreen]: undefined;
};

export type WalletStackParamList = {
  [Screens.Home]: undefined;
  [Screens.Import]: undefined;
};

export type MainTabParamList = {
  [Tabs.wallet]: NavigatorScreenParams<WalletStackParamList>;
  [Tabs.Gallery]: NavigatorScreenParams<GalleryStackParamList>;
};
export type AppStackParamList = {
  [Screens.BottomTab]: NavigatorScreenParams<MainTabParamList>;
  [Screens.GalleryDetailScreen]: {image: ImageRequireSource};
};
export type RootParamList = GalleryStackParamList &
  WalletStackParamList &
  AppStackParamList;

export type RootStackScreenProp<Screen extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, Screen>;

export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;

export type AppStackScreenProp<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;

export type AppStackScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList>,
  NativeStackScreenProps<AppStackParamList>
>;

// export type AppStackNavigationProp =
//   NativeStackNavigationProp<AppStackParamList>;
// export type AppStackScreenProps = NativeStackScreenProps<AppStackParamList>;

// export type AppStackScreenProp<Screen extends keyof AppStackParamList> =
//   NativeStackScreenProps<AppStackParamList, Screen>;

export const useAppStackNavigation = (): AppStackNavigationProp =>
  useNavigation<AppStackNavigationProp>();
