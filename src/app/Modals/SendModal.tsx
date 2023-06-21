import {Alert, Keyboard, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {BottomSheetModal} from '../../components/Modal/BottomSheetModal';
import {ModalName} from './constants';
import {useAppDispatch} from '../../store/hooks';
import {closeModal, openModal} from '../../features/modals/modalSlice';
import Text from '../../components/Text/Text';
import {spacing} from '../../utils/styles/sizing';
import TokenSelectInput from '../../components/Input/TokenSelectInput';
import BottomSheetTextInput from '../../components/Input/BottomSheetTextInput';
import {Button} from '../../components/Button/Button';
import {TokenList} from '../../services/constants';
import {getClipboard} from '../../utils/clipboard';
import {useTransferToken} from '../../features/transaction/hooks';
import {logger} from '../../utils/logger';
import OverlayLoading from '../../components/Loading/OverlayLoading';
import {reloadBalance} from '../../features/balance/balanceSlice';
import {ethers} from 'ethers';

type InputState = {
  value: string;
  error?: boolean;
  errorText?: string;
};

const SendModal = (): JSX.Element => {
  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<{
    visible: boolean;
    text?: string;
  }>();
  const [recieverAddress, setRecieverAddress] = useState<Address>('');
  const [tokenIndex, setTokenIndex] = useState<number>(0);

  const dispatch = useAppDispatch();

  const userSelectedToken = TokenList[tokenIndex];

  const {isLoading, transaction, isSuccess, transferToken, error} =
    useTransferToken({
      token: userSelectedToken,
      amount: amount,
      recieverAddress,
    });

  const handleValidation = (val: string) => {
    setAmount(val);
    if (isNaN(Number(val))) {
      setAmountError({visible: true, text: 'Please enter a number.'});
    } else {
      setAmountError({visible: false, text: ''});
    }
  };

  const pasteFromClipboard = async () => {
    const clipboard = await getClipboard();
    if (clipboard) {
      console.log(clipboard);
      setRecieverAddress(clipboard);
    }
  };

  const onSubmit = (): void => {
    transferToken();
  };
  const close = useCallback(() => {
    dispatch(closeModal({name: ModalName.SendModal}));
  }, [dispatch]);
  const showApprovedModal = useCallback((): void => {
    if (isSuccess && transaction) {
      logger.debug('SendModal', 'showApprovedModal', 'Open Approved modal');
      dispatch(
        openModal({
          name: ModalName.ApprovedTransactionModal,
          initialState: transaction,
        }),
      );
      dispatch(reloadBalance());
    }
    if (error && !isSuccess) {
      dispatch(
        openModal({
          name: ModalName.ErrorModal,
          initialState: {
            error: 'Transaction was failed!',
            message: error,
          },
        }),
      );
    }
    close();
  }, [isSuccess, transaction, error]);
  if (transaction && isSuccess) {
    close();
  }
  if (error) {
    close();
  }
  return (
    <BottomSheetModal
      name={ModalName.SendModal}
      onClose={() => showApprovedModal()}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text variant="title1" style={{marginBottom: spacing.spacing24}}>
            Send to
          </Text>
          <TokenSelectInput
            style={styles.selector}
            tokenList={TokenList}
            onSelect={val => setTokenIndex(val)}
            selected={tokenIndex}
          />
          <BottomSheetTextInput
            label="Amount"
            placeholder={`Amount e.g 2.0000 ${userSelectedToken?.symbol}`}
            containerStyle={styles.input}
            keyboardType="number-pad"
            onChangeText={val => handleValidation(val)}
            value={amount}
            error={amountError?.visible}
            errorText={amountError?.text}
          />
          <BottomSheetTextInput
            label="To"
            placeholder="Address e.g 0x0120..."
            containerStyle={styles.input}
            keyboardType="default"
            onChangeText={val => setRecieverAddress(val)}
            value={recieverAddress}
            icon={
              <Text variant="title4" onPress={() => pasteFromClipboard()}>
                Paste
              </Text>
            }
          />
          <View style={{flexDirection: 'row', paddingTop: spacing.spacing24}}>
            <Button
              label="Send"
              fill={true}
              disabled={amount && recieverAddress && !isLoading ? false : true}
              onPress={() => onSubmit()}
            />
          </View>
        </View>
      </Pressable>
      {isLoading && <OverlayLoading loading={isLoading} />}
    </BottomSheetModal>
  );
};

export default SendModal;

const styles = StyleSheet.create({
  container: {
    padding: spacing.spacing24,
    paddingBottom: spacing.spacing48,
    alignItems: 'center',
  },
  input: {},
  selector: {
    marginBottom: spacing.spacing24,
  },
});
