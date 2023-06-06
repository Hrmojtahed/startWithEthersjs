/**
 * @format
 */

// Import the crypto getRandomValues shim BEFORE ethers shims
import 'react-native-get-random-values';
// Import the the ethers shims BEFORE ethers
// import '@ethersproject/shims';
import '@ethersproject/shims/dist/index.js';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
