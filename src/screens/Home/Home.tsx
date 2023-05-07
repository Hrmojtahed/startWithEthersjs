import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/styles/color';
import {Button, IconButton, TextInput, Tooltip} from 'react-native-paper';
import {createWallet, getBalance} from '../../services/Api';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [walletInfo, setWalletInfo] = useState({});
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const getMyWalletBalance = async () => {
    setLoading(true);
    const address = '0x4d0E1CF61e3cCF0126DB2EF482A4328f10B448A5';
    const balance = await getBalance(address);
    console.log(balance);
    setLoading(false);
    return Alert.alert('Your Balance is', balance + ' ETH');
  };

  const createNewWallet = async () => {
    setLoading(true);
    const wallet = await createWallet();
    setLoading(false);
    setIsWalletCreated(true);
    setWalletInfo(wallet);
  };
  return (
    <View style={styles.container}>
      <Text>
        For create a new wallet, tap button below. we will show some information
        about your new wallet.
      </Text>
      <Button
        // icon="camera"
        mode="elevated"
        style={{marginTop: 24}}
        onPress={createNewWallet}
        loading={loading}>
        Create new wallet
      </Button>
      <View style={styles.line} />
      {isWalletCreated && (
        <View>
          <Text>Your wallet address : {walletInfo.address}</Text>
          <Text style={{marginTop: 20}}>
            Your wallet private key : {walletInfo.privateKey}
          </Text>
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
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    marginVertical: 24,
  },
});
