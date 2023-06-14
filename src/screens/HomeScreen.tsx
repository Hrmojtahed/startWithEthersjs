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
  const reloadTrigger = useAppSelector(state => state.balance.reloadTrigger);
  const navigation = useAppStackNavigation();
  const [accountBalance, setAccountBalance] = useState<TokenBalanceItemType>();
  if (!account) {
    dispatch(setFinishedOnboarding(false));
    return <ScreenLoading loading={true} />;
  }

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

  const onModalTest = async () => {
    dispatch(reloadBalance());
    // dispatch(openModal({name: ModalName.ApprovedTransactionModal}));
  };

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
          {account?.accountName}
        </TextButton>
        <AddressDisplay address={account?.address ?? ''} />
        <Seprator gap="spacing24" />
        <AccountBalance item={accountBalance} />
        <TransactionTool address={account.address} />
        <TokenBalanceList
          tokenList={balances}
          onPressToken={token => setAccountBalance(token)}
        />
        <Button
          label="Reload"
          customStyle={{Button: {marginTop: spacing.spacing24}}}
          onPress={onModalTest}
        />
        <Button
          label="Log state"
          customStyle={{Button: {marginTop: spacing.spacing24}}}
          onPress={() => console.log('reload trigger state : ', reloadTrigger)}
        />
        <Button
          label="Toggle state"
          customStyle={{Button: {marginTop: spacing.spacing24}}}
          onPress={() => dispatch(reloadBalance())}
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
