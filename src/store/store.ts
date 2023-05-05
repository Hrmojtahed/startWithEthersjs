import {configureStore} from '@reduxjs/toolkit';
import {Storage, persistReducer, persistStore} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';
import {rootReducers} from './reducers/rootReducers';

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
