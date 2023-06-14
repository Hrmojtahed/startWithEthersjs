/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ErrorBoundary} from './src/app/ErrorBoundary';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AppModals from './src/app/Modals/AppModals';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppStackNavigator} from './src/app/navigation/navigation';

export const navigationRef = createNavigationContainerRef();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BottomSheetModalProvider>
              <ErrorBoundary>
                <AppModals />
                <NavigationContainer ref={navigationRef}>
                  <AppStackNavigator />
                </NavigationContainer>
              </ErrorBoundary>
            </BottomSheetModalProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
