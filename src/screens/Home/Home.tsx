import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../utils/styles/color';
import {Button, IconButton, TextInput, Tooltip} from 'react-native-paper';
import {createWallet, getBalance} from '../../services/Api';
import {Web3Button, Web3Modal} from '@web3modal/react-native';
import {useWeb3Modal} from '@web3modal/react-native';
import {TouchableOpacity} from 'react-native';

const PROJECT_ID: string = '8bc9db449b6b6c5e4cfd264e4248d27a';
export const providerMetadata = {
  name: 'React Native V2 dApp',
  description: 'RN dApp by WalletConnect',
  url: 'https://walletconnect.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const Home = () => {
  const {isOpen, open, close, provider, isConnected} = useWeb3Modal();

  const openModal = async () => {
    await open({route: 'ConnectWallet'});
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={openModal}
        style={styles.btn}
        activeOpacity={0.8}>
        <Text style={styles.btnText}>Connect to Wallet</Text>
      </TouchableOpacity>
      <Web3Modal projectId={PROJECT_ID} providerMetadata={providerMetadata} />
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
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.lightGray,
  },
});
