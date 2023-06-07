import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import Button from '../../components/Button/Button';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  removeAllAccounts,
  selectActiveAccount,
} from '../../features/wallet/walletSlice';
import {useHomeNavigation} from '../../routing/Stacks/type';
import {HomeScreens} from '../screen';
import Text from '../../components/Text/Text';
import AddressDisplay from '../../components/AddressDisplay';
import {iconSizes, spacing} from '../../utils/styles/sizing';
import TextButton from '../../components/Button/TextButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {openModal} from '../../app/Modals/modalSlice';
import {ModalName} from '../../app/Modals/constants';

const AngleIcon = (
  <Ionicons
    name="chevron-down-sharp"
    size={iconSizes.icon16}
    color={colors.primary}
  />
);

const Home = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectActiveAccount);
  const navigation = useHomeNavigation();
  const handleOpenModal = () => {
    dispatch(openModal({name: ModalName.AccountModal}));
  };
  return (
    <View style={styles.container}>
      <TextButton
        iconPosition="right"
        iconGap={'spacing2'}
        icon={AngleIcon}
        onPress={handleOpenModal}>
        {account.accountName}
      </TextButton>
      <AddressDisplay address={account.address} />
      <View style={styles.balanceContainer}>
        <Text variant="body3" style={styles.balanceTitle}>
          Your Balance{' '}
        </Text>
        <Text variant="title1">0.3242343 {'MATIC'}</Text>
      </View>
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
  balanceContainer: {
    marginTop: spacing.spacing48,
    alignItems: 'center',
  },
  balanceTitle: {
    marginBottom: spacing.spacing8,
  },
});
