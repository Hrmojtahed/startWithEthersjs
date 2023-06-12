import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {BottomSheetModal} from '../../components/Modal/BottomSheetModal';
import {ModalName} from './constants';
import {useAppDispatch} from '../../store/hooks';
import {closeModal} from '../../features/modals/modalSlice';
import Text from '../../components/Text/Text';
import {spacing} from '../../utils/styles/sizing';
import TokenSelectInput from '../../components/Input/TokenSelectInput';
import TextInput from '../../components/Input/TextInput';
import BottomSheetTextInput from '../../components/Input/BottomSheetTextInput';
import {Button} from '../../components/Button/Button';
import {TokenList} from '../../services/constants';
import {getClipboard} from '../../utils/clipboard';

const SendModal = (): JSX.Element => {
  const [amount, setAmount] = useState<string>('');
  const [recieverAddress, setRecieverAddress] = useState<Address>('');
  const [tokenIndex, setTokenIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeModal({name: ModalName.SendModal}));
  };
  const pasteFromClipboard = async () => {
    const clipboard = await getClipboard();
    if (clipboard) {
      setRecieverAddress(clipboard);
    }
  };
  return (
    <BottomSheetModal name={ModalName.SendModal} onClose={close}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text variant="title1" style={{marginBottom: spacing.spacing24}}>
            Send to
          </Text>
          <TokenSelectInput
            style={styles.input}
            tokenList={TokenList}
            onSelect={val => setTokenIndex(val)}
            selected={tokenIndex}
          />
          <BottomSheetTextInput
            label="Amount"
            placeholder="Amount e.g 2.0000"
            containerStyle={styles.input}
            keyboardType="number-pad"
            onChangeText={val => setAmount(val)}
            value={amount}
          />
          <BottomSheetTextInput
            label="To"
            placeholder="Address e.g 0x0120..."
            containerStyle={styles.input}
            keyboardType="default"
            onChangeText={val => setRecieverAddress(val)}
            value={recieverAddress}
            icon={
              <Text variant="title4" onPress={pasteFromClipboard}>
                Paste
              </Text>
            }
          />
          <View style={{flexDirection: 'row', paddingTop: spacing.spacing24}}>
            <Button
              label="Send"
              fill={true}
              disabled={amount && recieverAddress ? false : true}
            />
          </View>
        </View>
      </Pressable>
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
  input: {
    marginBottom: spacing.spacing24,
  },
});
