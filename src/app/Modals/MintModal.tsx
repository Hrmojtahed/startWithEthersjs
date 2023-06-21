import {Alert, StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  closeModal,
  openModal,
  selectModalState,
} from '../../features/modals/modalSlice';
import {ModalName} from './constants';
import {BottomSheetModal} from '../../components/Modal/BottomSheetModal';
import Text from '../../components/Text/Text';
import {spacing} from '../../utils/styles/sizing';
import TextInput from '../../components/Input/TextInput';
import {Button} from '../../components/Button/Button';
import {colors} from '../../utils/styles/color';
import {ButtonEmphasis, ButtonSize} from '../../components/Button/type';
import BottomSheetTextInput from '../../components/Input/BottomSheetTextInput';

import {selectActiveAccount} from '../../features/wallet/walletSlice';

import {logger} from '../../utils/logger';
import {useMintToken} from '../../features/transaction/hooks';
import {reloadBalance} from '../../features/balance/balanceSlice';
import OverlayLoading from '../../components/Loading/OverlayLoading';
type Props = {};
const MintModal = ({}: Props): JSX.Element => {
  const modalState = useAppSelector(selectModalState(ModalName.MintModal));
  const token = modalState.initialState;
  const dispatch = useAppDispatch();
  if (!token) return <></>;
  const [mintValue, setMintValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const {
    isLoading,
    onMint,
    isSuccess,
    transaction,
    error: mintError,
  } = useMintToken({
    token,
    amount: mintValue,
  });

  const close = () => {
    dispatch(closeModal({name: ModalName.MintModal}));
  };
  const onSubmit = useCallback(async () => {
    onMint();
  }, [onMint]);

  const validationInput = (input: string): void => {
    setMintValue(input);

    if (isNaN(Number(input))) {
      setError('please inter a number');
      return;
    }
    const convertedInput = Number(input);
    if (convertedInput <= 0) {
      setError('input value must be greater than 0. ');
    } else if (convertedInput > 10) {
      setError('input value must be smaller than 10. ');
    } else {
      setError('');
    }
  };
  if (mintError) {
    Alert.alert(mintError);
  }

  const showApprovedModal = (): void => {
    console.log('showApprovedModal', isSuccess, transaction);
    if (isSuccess && transaction) {
      logger.debug(
        'MintModal',
        'showApprovedModal',
        'Open Approved modal',
        transaction,
      );
      dispatch(
        openModal({
          name: ModalName.ApprovedTransactionModal,
          initialState: transaction,
        }),
      );
      dispatch(reloadBalance());
    }
    if (mintError && !isSuccess) {
      dispatch(
        openModal({
          name: ModalName.ErrorModal,
          initialState: {
            error: 'Mint Token was failed!',
            message: mintError,
          },
        }),
      );
    }
    close();
  };
  if (isSuccess && transaction) {
    close();
  }
  if (mintError) {
    close();
  }
  return (
    <BottomSheetModal
      // isDismissible={!isLoading}
      name={ModalName.MintModal}
      onClose={() => showApprovedModal()}>
      <View style={styles.container}>
        <Text variant="title2">Mint {token?.name}</Text>
        <Text style={{marginTop: spacing.spacing4}} variant="body2">
          Input a number between 0 and 10 for mint.
        </Text>
        <BottomSheetTextInput
          placeholder="Enter number: e.g 3"
          containerStyle={{marginTop: spacing.spacing12}}
          keyboardType="number-pad"
          onChangeText={value => validationInput(value)}
          value={mintValue}
          error={error ? true : false}
          errorText={error}
        />

        <View style={styles.wrapper}>
          <Button
            label="Mint Token"
            emphasis={ButtonEmphasis.Primary}
            fill={true}
            customStyle={{Button: styles.btn}}
            onPress={onSubmit}
            disabled={!(mintValue && !error)}
          />
        </View>
      </View>
      {isLoading && <OverlayLoading loading={isLoading} />}
    </BottomSheetModal>
  );
};

export default MintModal;

const styles = StyleSheet.create({
  container: {
    padding: spacing.spacing24,
    alignItems: 'center',
  },
  btn: {
    marginVertical: spacing.spacing36,
  },
  wrapper: {
    flexDirection: 'row',
  },
  empty: {
    height: 22,
  },
  errorText: {
    color: colors.red,
    alignSelf: 'flex-start',
    marginTop: spacing.spacing8,
  },
});
