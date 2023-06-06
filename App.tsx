/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStacks from './src/routing/Stacks/MainStacks';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ErrorBoundary} from './src/app/ErrorBoundary';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AppModals from './src/app/Modals/AppModals';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomSheetModalProvider>
            <ErrorBoundary>
              <AppModals />
              <NavigationContainer>
                <MainStacks />
              </NavigationContainer>
            </ErrorBoundary>
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
