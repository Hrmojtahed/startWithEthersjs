import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors} from '../utils/styles/color';

import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  selectActiveAccount,
  setFinishedOnboarding,
} from '../features/wallet/walletSlice';

import {Screens} from './Screen';
import Text from '../components/Text/Text';
import AddressDisplay from '../components/AddressDisplay';
import {iconSizes, spacing} from '../utils/styles/sizing';
import {TextButton} from '../components/Button/TextButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {openModal} from '../app/Modals/modalSlice';
import {ModalName} from '../app/Modals/constants';
import {
  TokenBalanceItemType,
  useGetAccountBalance,
  useGetBalanceOfTokenList,
} from '../features/balance/hooks';
import {GOLD, MATIC, TokenList} from '../services/constants';

import OverlayLoading from '../components/Loading/OverlayLoading';
import {Button} from '../components/Button/Button';

import {
  RootStackScreenProp,
  useAppStackNavigation,
} from '../app/navigation/type';
import TokenBalanceList from '../components/TokenBalanceList/TokenBalanceList';
import Seprator from '../components/seprator/Seprator';
import AccountBalance from '../components/Balance/AccountBalance';
import TransactionTool from '../components/TransactionTool/TransactionTool';

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
  const navigation = useAppStackNavigation();
  const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);

  const [accountBalance, setAccountBalance] = useState<TokenBalanceItemType>();
  if (!account) {
    dispatch(setFinishedOnboarding(false));
    return <OverlayLoading loading={true} />;
  }

  const {isLoading, balances, refreshing, onRefresh} = useGetBalanceOfTokenList(
    TokenList,
    account,
  );
  const overlayLoading = isLoading;
  useEffect(() => {
    setAccountBalance(balances[0]);
  }, [refreshing]);

  const reloadBalance = () => {
    setReloadTrigger(!reloadTrigger);
  };

  const handleOpenModal = () => {
    dispatch(openModal({name: ModalName.AccountModal}));
  };
  if (overlayLoading && !refreshing) {
    return <OverlayLoading loading={overlayLoading} />;
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
          {account?.accountName}
        </TextButton>
        <AddressDisplay address={account?.address ?? ''} />
        <Seprator gap="spacing24" />
        <AccountBalance item={accountBalance} />
        <TransactionTool />
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
