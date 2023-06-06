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

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <NavigationContainer>
              <MainStacks />
            </NavigationContainer>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
