import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '../../utils/styles/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Screens, Tabs} from '../../screens/Screen';

import {
  AppStackParamList,
  GalleryStackParamList,
  MainTabParamList,
  WalletStackParamList,
} from './type';
import {useAppSelector} from '../../store/hooks';
import HomeScreen from '../../screens/HomeScreen';
import Import from '../../screens/Onboarding/Import';
import GalleryListScreen from '../../screens/Gallery/GalleryListScreen';
import GalleryDetailScreen from '../../screens/Gallery/GalleryDetailScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

const WalletStack = createNativeStackNavigator<WalletStackParamList>();
const GalleryStack = createNativeStackNavigator<GalleryStackParamList>();

export function BottomTabNavigator(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
      }}>
      <Tab.Screen
        name={Tabs.Gallery}
        component={GalleryStackNavigator}
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
        }}
      />
      <Tab.Screen
        name={Tabs.wallet}
        component={WalletStackNavigator}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'wallet' : 'wallet-outline'}
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
        }}
      />
    </Tab.Navigator>
  );
}

export function WalletStackNavigator(): JSX.Element {
  const isOnboardingFinished = useAppSelector(
    state => state.wallet.finishedOnboarding,
  );

  return (
    <WalletStack.Navigator initialRouteName={Screens.Import}>
      {isOnboardingFinished ? (
        <WalletStack.Group>
          <WalletStack.Screen
            name={Screens.Home}
            component={HomeScreen}
            options={{title: 'Wallet'}}
          />
        </WalletStack.Group>
      ) : (
        <WalletStack.Group>
          <WalletStack.Screen name={Screens.Import} component={Import} />
        </WalletStack.Group>
      )}
    </WalletStack.Navigator>
  );
}
export function GalleryStackNavigator(): JSX.Element {
  return (
    <GalleryStack.Navigator screenOptions={{headerShown: false}}>
      <GalleryStack.Screen
        name={Screens.GalleryListScreen}
        component={GalleryListScreen}
      />
    </GalleryStack.Navigator>
  );
}
export function AppStackNavigator(): JSX.Element {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
      }}>
      <AppStack.Screen
        name={Screens.BottomTab}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={Screens.GalleryDetailScreen}
        component={GalleryDetailScreen}
        options={{title: 'Gallery', presentation: 'card'}}
      />
    </AppStack.Navigator>
  );
}
