import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeModal, selectModalState} from '../../features/modals/modalSlice';
import {ModalName} from './constants';
import {BottomSheetModal} from '../../components/Modal/BottomSheetModal';
import Text from '../../components/Text/Text';
import {spacing} from '../../utils/styles/sizing';
import TextInput from '../../components/Input/TextInput';
import {Button} from '../../components/Button/Button';
import {colors} from '../../utils/styles/color';
import {ButtonEmphasis, ButtonSize} from '../../components/Button/type';
import BottomSheetTextInput from '../../components/Input/BottomSheetTextInput';
type Props = {};
const MintModal = ({}: Props): JSX.Element => {
  const modalState = useAppSelector(selectModalState(ModalName.MintModal));
  const token = modalState.initialState;
  const [mintValue, setMintValue] = useState<string>('');
  const [error, setError] = useState<string | null>('');
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeModal({name: ModalName.MintModal}));
  };
  const onSubmit = () => {
    close();
  };

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
      setError(null);
    }
  };

  return (
    <BottomSheetModal name={ModalName.MintModal} onClose={close}>
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
        />
        {error ? (
          <Text variant="subtitle1" style={styles.errorText}>
            {error}
          </Text>
        ) : (
          <View style={styles.empty} />
        )}
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
