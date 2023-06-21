import {Alert, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors} from '../../utils/styles/color';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {Button} from '../../components/Button/Button';
import TextInput from '../../components/Input/TextInput';
import {spacing} from '../../utils/styles/sizing';
import {logger} from '../../utils/logger';
import {useGetWalletByKeyQuery} from '../../features/walletConnect/api';
import {
  WalletImportEnum,
  checkSeedPhraseOrPrivateKey,
} from '../../features/wallet/utils';
import {
  addAccount,
  removeAccount,
  removeAllAccounts,
  setFinishedOnboarding,
} from '../../features/wallet/walletSlice';
import {Screens} from '../Screen';
import Text from '../../components/Text/Text';
import {getClipboard} from '../../utils/clipboard';
import {
  RootStackScreenProp,
  useAppStackNavigation,
} from '../../app/navigation/type';
import '@walletconnect/react-native-compat';
import {Web3Modal, useWeb3Modal, Web3Button} from '@web3modal/react-native';
import {
  WALLETCONNECT_PROJECT_ID,
  providerMetadata,
  sessionParams,
} from '../../utils/config';
import {ethers, providers} from 'ethers';
import {AccountType} from '../../features/wallet/accounts/type';
import {exportAccountFromProvider} from '../../features/walletConnect/utils';

type Props = RootStackScreenProp<Screens.Import>;

function Import(props: Props): JSX.Element {
  const navigation = useAppStackNavigation();
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(state => state.wallet.accounts);
  const isOnboardingFinished = useAppSelector(
    state => state.wallet.finishedOnboarding,
  );
  const [userInput, setUserInput] = useState<string>('');
  const [isTaped, setIsTaped] = useState(false);

  const {isConnected, provider, isOpen, open, address} = useWeb3Modal();

  const {
    isLoading: walletImportLoading,
    data: walletData,
    error: connectWalletError,
  } = useGetWalletByKeyQuery(userInput, {
    skip: !isTaped,
  });

  useEffect(() => {
    logger.debug(
      'Import',
      '',
      'Wallet connect status : ',
      isConnected,
      typeof provider,
    );
    async function addAccountFromWalletConnect(provider: any) {
      if (provider && isConnected && !isOnboardingFinished) {
        logger.debug(
          'Import',
          'addAccountFromWalletConnect',
          `WC is Connected: ${isConnected} -- provider : ${typeof provider} `,
        );
        const data = await exportAccountFromProvider(provider);
        dispatch(addAccount(data));
        dispatch(setFinishedOnboarding(true));
      }
    }

    addAccountFromWalletConnect(provider);
  }, [isConnected, provider]);

  const handleImport = async () => {
    // check user input data [seed phrase | private key] -- done
    // call importWallet function -- Done
    // change screen -- Done

    if (!userInput) {
      return;
    }
    const isAddressValid = checkSeedPhraseOrPrivateKey(userInput);

    if (isAddressValid == WalletImportEnum.Other) {
      Alert.alert('Try again', 'Enter a valid data');
      return <></>;
    }
    setIsTaped(true);
  };

  if (walletData?.address && walletImportLoading == false) {
    setIsTaped(false);
    setUserInput('');
    logger.debug(
      'Import',
      '',
      'Wallet imported successfuly.',
      JSON.stringify(walletData, null, 5),
    );

    dispatch(
      addAccount({
        type: AccountType.Import,
        address: walletData.address,
        active: true,
        connected: true,
        _privateKey: walletData.privateKey,
      }),
    );

    Alert.alert(
      'Wallet imported successfuly',
      `Wallet address\n${walletData.address}`,
      [
        {
          text: 'Done',
          onPress: () => {
            dispatch(setFinishedOnboarding(true));
          },
        },
      ],
      {},
    );
    return <></>;
  }

  if (connectWalletError) {
    setIsTaped(false);

    logger.debug('Home', 'error', 'error message :', connectWalletError);
    Alert.alert('Somthing went wrong', `${connectWalletError.data}`);
    return <></>;
  }

  const pasteFromClipboard = async () => {
    const clipboard = await getClipboard();
    if (clipboard) {
      setUserInput(clipboard);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title]} variant="title1">
        Import Wallet
      </Text>
      <Text variant="body3" style={styles.subtitle}>
        Enter your phrase or private key to import your wallet
      </Text>
      <TextInput
        placeholder="Enter seed phrase or private key"
        containerStyle={{marginBottom: spacing.spacing24}}
        onChangeText={val => setUserInput(val)}
        value={userInput}
        iconPosition="right"
        icon={
          <Text variant="title4" onPress={pasteFromClipboard}>
            Paste
          </Text>
        }
      />
      <View style={{flexDirection: 'row'}}>
        <Button
          label="Import"
          onPress={() => handleImport()}
          disabled={walletImportLoading || !userInput}
          loading={walletImportLoading}
          fill={true}
        />
      </View>
      <Text style={styles.orText} variant="body1">
        Or
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <Button
          label="Wallet Connect"
          onPress={() => open()}
          fill={true}
          disabled={isOpen}
        />
      </View>

      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <Button
          label="Log"
          onPress={() =>
            console.log('accounts', JSON.stringify(accounts, null, 2))
          }
          fill={true}
          disabled={isOpen}
        />
      </View>
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <Button
          label="Remove All"
          onPress={() => dispatch(removeAllAccounts())}
          fill={true}
          disabled={isOpen}
        />
      </View>
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <Button
          label="disconnect"
          onPress={() => {
            console.log('provider disconnected!!!');
            provider.disconnect();
            dispatch(removeAccount(address));
          }}
          fill={true}
          disabled={!isConnected}
        />
      </View>
    </View>
  );
}

export default Import;

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

  wrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },

  title: {
    marginBottom: spacing.spacing8,
  },
  subtitle: {
    marginBottom: spacing.spacing24,
  },
  orText: {
    marginVertical: spacing.spacing36,
  },
});
