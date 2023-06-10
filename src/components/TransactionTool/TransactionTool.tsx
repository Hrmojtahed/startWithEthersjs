import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../Text/Text';
import {spacing} from '../../utils/styles/sizing';
import CircleButton from '../Button/CircleButton';
import {useAppDispatch} from '../../store/hooks';

const TransactionTool = () => {
  const dispatch = useAppDispatch();
  const openSendModal = () => {};
  const openRecieveModal = () => {};
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
