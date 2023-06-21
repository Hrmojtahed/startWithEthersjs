import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {colors} from '../utils/styles/color';

import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  removeAccount,
  selectActiveAccount,
  setFinishedOnboarding,
} from '../features/wallet/walletSlice';

import {Screens} from './Screen';
import Text from '../components/Text/Text';
import AddressDisplay from '../components/AddressDisplay';
import {iconSizes, spacing} from '../utils/styles/sizing';
import {TextButton} from '../components/Button/TextButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {openModal} from '../features/modals/modalSlice';
import {ModalName} from '../app/Modals/constants';
import {
  TokenBalanceItemType,
  useGetAccountBalance,
  useGetBalanceOfTokenList,
} from '../features/balance/hooks';
import {GOLD, MATIC, TokenList} from '../services/constants';

import ScreenLoading from '../components/Loading/ScreenLoading';

import {
  RootStackScreenProp,
  useAppStackNavigation,
} from '../app/navigation/type';
import TokenBalanceList from '../components/TokenBalanceList/TokenBalanceList';
import Seprator from '../components/seprator/Seprator';
import AccountBalance from '../components/Balance/AccountBalance';
import TransactionTool from '../components/TransactionTool/TransactionTool';
import {Button} from '../components/Button/Button';
import {mintToken} from '../features/transaction/utils';
import {reloadBalance} from '../features/balance/balanceSlice';
import {logger} from '../utils/logger';
import {useWeb3Modal, Web3Modal} from '@web3modal/react-native';
import {AccountType} from '../features/wallet/accounts/type';
import {useProvider} from '../features/provider/hooks';
import {
  WALLETCONNECT_PROJECT_ID,
  providerMetadata,
  sessionParams,
} from '../utils/config';
const AngleIcon = (
  <Ionicons
    name="chevron-down-sharp"
    size={iconSizes.icon16}
    color={colors.primary}
  />
);
type Props = RootStackScreenProp<Screens.Home>;
const Home = (props: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectActiveAccount);
  const allAccounts = useAppSelector(state => state.wallet.accounts);
  const reloadTrigger = useAppSelector(state => state.balance.reloadTrigger);
  const navigation = useAppStackNavigation();
  const [accountBalance, setAccountBalance] = useState<TokenBalanceItemType>();
  const {isConnectedWC} = useProvider();
  if (!account) {
    dispatch(setFinishedOnboarding(false));
    return <ScreenLoading loading={true} />;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return account.type == AccountType.WalletConnect ? (
          <Text variant="title4">
            {isConnectedWC ? 'Connected' : 'disconnected'}
          </Text>
        ) : null;
      },
    });
  }, [navigation, isConnectedWC]);
  const {isLoading, balances, refreshing, onRefresh} = useGetBalanceOfTokenList(
    TokenList,
    account,
  );
  const overlayLoading = isLoading;
  const handleOpenModal = () => {
    dispatch(openModal({name: ModalName.AccountModal}));
  };

  useEffect(() => {
    if (!isLoading) {
      setAccountBalance(balances[0]);
    }
  }, [isLoading]);

  if (overlayLoading && !refreshing) {
    return (
      <ScreenLoading loading={overlayLoading} indicatorColor={colors.primary} />
    );
  }
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <TextButton
          iconPosition="right"
          iconGap={'spacing2'}
          icon={AngleIcon}
          onPress={handleOpenModal}
          buttonStyle={{marginBottom: spacing.spacing8}}>
          {account?.name}
        </TextButton>
        <AddressDisplay address={account?.address ?? ''} />
        <Seprator gap="spacing24" />
        <AccountBalance item={accountBalance} />
        <TransactionTool address={account.address} />
        <TokenBalanceList
          tokenList={balances}
          onPressToken={token => setAccountBalance(token)}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  balanceContainer: {
    marginTop: spacing.spacing48,
    alignItems: 'center',
  },
  balanceTitle: {
    marginBottom: spacing.spacing8,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  scrollView: {
    backgroundColor: colors.white,
  },
});
