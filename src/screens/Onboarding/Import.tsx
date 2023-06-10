import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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
  removeAllAccounts,
  setFinishedOnboarding,
} from '../../features/wallet/walletSlice';
import {HomeScreens, Screens} from '../Screen';
import Text from '../../components/Text/Text';
import {getClipboard} from '../../utils/clipboard';
import {
  RootStackScreenProp,
  useAppStackNavigation,
} from '../../app/navigation/type';

type Props = RootStackScreenProp<Screens.Import>;

function Import(props: Props): JSX.Element {
  const navigation = useAppStackNavigation();
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(state => state.wallet.accounts);
  const [userInput, setUserInput] = useState<string>('');
  const [isTaped, setIsTaped] = useState(false);

  const {
    isLoading: walletImportLoading,
    data: walletData,
    error,
  } = useGetWalletByKeyQuery(userInput, {
    skip: !isTaped,
  });

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
  const handleRemove = () => {
    dispatch(removeAllAccounts());
  };
  if (walletData?.address && walletImportLoading == false) {
    setIsTaped(false);
    setUserInput('');

    dispatch(addAccount(walletData));

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
    );
    return <></>;
  }

  if (error) {
    setIsTaped(false);
    // setUserInput('');
    logger.debug('Home', 'error', 'error message :', error);
    Alert.alert('Somthing went wrong', `${error.data}`);
    return <></>;
  }

  const pasteFromClipboard = async () => {
    const clipboard = await getClipboard();
    if (clipboard) {
      setUserInput(clipboard);
    }
  };

  const handleLog = () => {
    logger.debug('Onboarding', 'handleLog', 'accounts :', accounts);
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
      <Button
        label="Import"
        onPress={() => handleImport()}
        disabled={walletImportLoading || !userInput}
        loading={walletImportLoading}
      />
      <Button
        label="Remove All"
        onPress={() => handleRemove()}
        customStyle={{Button: {marginTop: 32}}}
      />
      <Button
        label="Log"
        onPress={() => handleLog()}
        customStyle={{Button: {marginTop: 32}}}
      />
    </View>
  );
}

export default Import;

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
});
