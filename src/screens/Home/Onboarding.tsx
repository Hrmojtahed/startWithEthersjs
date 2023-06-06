import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/styles/color';

import {
  HomeStackScreenProp,
  useHomeNavigation,
} from '../../routing/Stacks/type';

import {useAppDispatch} from '../../store/hooks';

import Button from '../../components/Button/Button';
import TextInput from '../../components/Input/TextInput';
import {Typography} from '../../utils/styles/typography';
import {spacing} from '../../utils/styles/sizing';

import {logger} from '../../utils/logger';

import {useGetWalletByKeyQuery} from '../../features/walletConnect/api';
import {
  WalletImportEnum,
  checkSeedPhraseOrPrivateKey,
} from '../../features/wallet/utils';
import {addAccount, removeAllAccounts} from '../../features/wallet/walletSlice';
import {HomeScreens} from '../screen';
import Text from '../../components/Text/Text';
import * as Clipboard from 'expo-clipboard';

type Props = HomeStackScreenProp<HomeScreens.Home>;

function Onboarding(): React.ReactElement<Props> {
  const navigation = useHomeNavigation();
  const dispatch = useAppDispatch();
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
      return Alert.alert('Try again', 'Enter a valid data');
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

    return Alert.alert(
      'Wallet imported successfuly',
      `Wallet address\n${walletData.address}`,
      [
        {
          text: 'Done',
          onPress: () => navigation.replace(HomeScreens.Home),
        },
      ],
    );
  }
  if (error) {
    setIsTaped(false);
    setUserInput('');
    logger.debug('Home', 'error', 'error message :', error);
    return Alert.alert('Somthing went wrong', `${error.data}`);
  }

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setUserInput(text);
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
        text="Import"
        onPress={() => handleImport()}
        disabled={walletImportLoading || !userInput}
        loading={walletImportLoading}
      />
      <Button
        text="Remove All"
        onPress={() => handleRemove()}
        buttonStyle={{marginTop: 32}}
      />
    </View>
  );
}

export default Onboarding;

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
