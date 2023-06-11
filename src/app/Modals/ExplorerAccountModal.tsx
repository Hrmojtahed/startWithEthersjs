import 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {BottomSheetModal} from '../../components/Modal/BottomSheetModal';
import {ModalName} from './constants';
import Text from '../../components/Text/Text';
import {closeModal} from '../../features/modals/modalSlice';
import {spacing} from '../../utils/styles/sizing';
import {Button} from '../../components/Button/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Account} from '../../features/wallet/accounts/type';
import {ButtonEmphasis, ButtonSize} from '../../components/Button/type';

import {HomeScreens} from '../../screens/Screen';
import {navigationRef} from '../../../App';
import {
  removeAccount,
  setFinishedOnboarding,
} from '../../features/wallet/walletSlice';

const ExplorerAccountModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <BottomSheetModal
      name={ModalName.AccountModal}
      onClose={(): void => {
        dispatch(closeModal({name: ModalName.AccountModal}));
      }}
      isDismissible={true}>
      <ExplorerAccount
        onClose={(): void => {
          dispatch(closeModal({name: ModalName.AccountModal}));
        }}
      />
    </BottomSheetModal>
  );
};

export default ExplorerAccountModal;

const ExplorerAccount = ({onClose}: {onClose: () => void}): JSX.Element => {
  const accounts = useAppSelector(state => state.wallet.accounts);
  const numOfAccounts = Object.keys(accounts).length ?? 0;
  const dispatch = useAppDispatch();

  const accountList = Object.values(accounts);
  const safeArea = useSafeAreaInsets();

  const addWallet = () => {
    onClose();
  };
  const removeWallet = (address: Address) => {
    onClose();
    if (numOfAccounts <= 1) {
      dispatch(setFinishedOnboarding(false));
    }
    dispatch(removeAccount(address));
  };
  return (
    <View
      style={[
        styles.container,
        {paddingBottom: spacing.spacing24 + safeArea.bottom},
      ]}>
      <View style={styles.walletListContainer}>
        {accountList?.map(account => (
          <AccountItem
            account={account}
            key={account?.accountName}
            onRemovePress={removeWallet}
          />
        ))}
      </View>
      <Button label="Add Wallet" type="outline" onPress={addWallet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.spacing24,
  },
  walletListContainer: {
    marginBottom: spacing.spacing48,
  },
  addBtn: {},
});

/**
 *
 * Account Item for render in list
 */

type AccountItemProps = {
  account: Account;
  onRemovePress: (address: Address) => void;
};

const AccountItem = ({
  account,
  onRemovePress,
}: AccountItemProps): JSX.Element => {
  return (
    <View style={listItemStyle.itemContainer}>
      <View style={listItemStyle.textContainer}>
        <Text style={listItemStyle.text} variant="title2">
          {account.accountName}
        </Text>
        <Text numberOfLines={1} variant="subtitle1">
          {account.address}
        </Text>
      </View>
      <View>
        <Button
          label="Remove"
          fill={false}
          emphasis={ButtonEmphasis.Error}
          size={ButtonSize.Small}
          type={'outline'}
          onPress={() => onRemovePress(account.address)}
        />
      </View>
    </View>
  );
};

const listItemStyle = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: spacing.spacing36,
  },
  text: {
    marginBottom: spacing.spacing8,
  },
  button: {},
});
