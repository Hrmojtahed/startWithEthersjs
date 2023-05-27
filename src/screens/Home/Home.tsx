import {Alert, Pressable, StyleSheet, Text, View, Button} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {colors} from '../../utils/styles/color';
import {IconButton, TextInput, Tooltip} from 'react-native-paper';
import {createWallet, getBalance} from '../../services/Api';
import {Web3Button, Web3Modal} from '@web3modal/react-native';
import {useWeb3Modal} from '@web3modal/react-native';
import {TouchableOpacity} from 'react-native';
import {
  WALLETCONNECT_PROJECT_ID,
  WalletConnectMetadata,
} from '../../utils/config';
import {
  HomeStackScreenProp,
  RootStackParamList,
  RootStackScreenProp,
  useAppNavigation,
  useHomeNavigation,
} from '../../routing/Stacks/type';

import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  setWalletConnect,
  disconnectWallet,
} from '../../store/reducers/slices/walletSlice';

const Home = () => {
  const {isOpen, open, close, provider, isConnected} = useWeb3Modal();
  const navigation = useHomeNavigation();
  const [blockNumber, setBlockNumber] = useState(0);
  const isWalletConnected = useAppSelector(state => state.wallet.isConnected);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
    });
  }, [navigation, blockNumber]);

  return (
    <View style={styles.container}>
      {isWalletConnected ? (
        <View style={styles.wrapper}>
          <Text>connected to wallet</Text>
          <Button title="Disconnect" />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            Please connect your wallet for more functions and features:
          </Text>

          <TouchableOpacity
            onPress={() => {}}
            style={styles.btn}
            activeOpacity={0.8}>
            <Text style={styles.btnText}>Connect to Metamask</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    marginVertical: 24,
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginBottom: 12,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.lightGray,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 32,
    lineHeight: 22,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
