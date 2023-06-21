import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeModal, selectModalState} from '../../features/modals/modalSlice';
import {ModalName} from './constants';
import Modal from 'react-native-modal';
import {colors} from '../../utils/styles/color';
import {borderRad, iconSizes, spacing} from '../../utils/styles/sizing';
import Text from '../../components/Text/Text';
import {Button} from '../../components/Button/Button';
import {ButtonSize} from '../../components/Button/type';
import TouchableArea from '../../components/Button/TouchableArea';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('screen');
const ErrorModal = (): JSX.Element | null => {
  const modalState = useAppSelector(selectModalState(ModalName.ErrorModal));

  const dispatch = useAppDispatch();
  const close = useCallback(() => {
    dispatch(closeModal({name: ModalName.ErrorModal}));
  }, [dispatch]);

  useEffect(() => {
    console.log(modalState);
  }, [modalState.isOpen]);

  return (
    <Modal
      isVisible={modalState.isOpen}
      onBackdropPress={() => close()}
      onDismiss={() => close()}
      backdropOpacity={0.5}
      backdropTransitionOutTiming={5}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={{margin: 0, padding: 0}}>
      <View style={styles.container}>
        <TouchableArea style={styles.btn} onPress={() => close()}>
          <Ionicons
            name={'close'}
            size={iconSizes.icon20}
            color={colors.primary}
          />
        </TouchableArea>
        <Text variant="title3">
          {modalState?.initialState?.error ?? 'Error'}
        </Text>
        <View style={{height: 12}} />
        <Text variant="body2">
          {modalState?.initialState?.message ?? 'Error accured'}
        </Text>
        <View style={{height: 36}} />
        <View style={{flexDirection: 'row'}}>
          <Button
            label="Done"
            size={ButtonSize.Small}
            fill
            onPress={() => close()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    // height: width * 0.5,
    backgroundColor: colors.white,
    borderRadius: borderRad.rounded20,
    alignSelf: 'center',
    padding: spacing.spacing12,
    alignItems: 'center',
    paddingTop: spacing.spacing48,
  },
  btn: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
