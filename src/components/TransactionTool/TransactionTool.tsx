import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../Text/Text';
import {spacing} from '../../utils/styles/sizing';
import CircleButton from '../Button/CircleButton';
import {useAppDispatch} from '../../store/hooks';
import {openModal} from '../../features/modals/modalSlice';
import {ModalName} from '../../app/Modals/constants';

const TransactionTool = ({address}: {address: Address}): JSX.Element => {
  const dispatch = useAppDispatch();
  const openSendModal = () => {
    dispatch(openModal({name: ModalName.SendModal}));
  };
  const openRecieveModal = () => {
    dispatch(
      openModal({name: ModalName.ShowAddressModal, initialState: address}),
    );
  };
  return (
    <View style={styles.container}>
      <CircleButton
        label="Send"
        iconName="arrow-top-right"
        labelVariant="title4"
        onPress={openSendModal}
      />
      <CircleButton
        label="Recieve"
        iconName="arrow-collapse-down"
        labelVariant="title4"
        onPress={openRecieveModal}
      />
    </View>
  );
};

export default TransactionTool;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: spacing.spacing24,
    paddingVertical: spacing.spacing36,
  },
});
