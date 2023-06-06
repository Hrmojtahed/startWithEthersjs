import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {colors} from '../../utils/styles/color';

import {
  HomeStackScreenProp,
  useHomeNavigation,
} from '../../routing/Stacks/type';

import {useAppDispatch, useAppSelector} from '../../store/hooks';

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
import {Account} from '../../features/wallet/accounts/type';

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

  return (
    <View style={styles.container}>
      <Text style={[Typography.title1, styles.title]}>Import Wallet</Text>
      <Text style={styles.subtitle}>
        Enter your phrase or private key to import your wallet
      </Text>
      <TextInput
        placeholder="Enter seed phrase or private key"
        containerStyle={{marginBottom: spacing.spacing24}}
        onChangeText={val => setUserInput(val)}
        value={userInput}
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
    marginBottom: spacing.spacing12,
  },
  subtitle: {
    ...Typography.body2,
    marginBottom: spacing.spacing24,
  },
});
