import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {BottomSheetModal} from '../../components/Modal/BottomSheetModal';
import {ModalName} from './constants';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeModal, selectModalState} from '../../features/modals/modalSlice';
import Text from '../../components/Text/Text';
import {borderRad, spacing} from '../../utils/styles/sizing';
import {colors} from '../../utils/styles/color';
import TouchableArea from '../../components/Button/TouchableArea';
import {setClipboard} from '../../utils/clipboard';
import QRCode from 'react-qr-code';

const {width, height} = Dimensions.get('window');

const qr_size = width * 0.5;

const ShowAddressModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const modalState = useAppSelector(
    selectModalState(ModalName.ShowAddressModal),
  );
  const close = () => {
    dispatch(closeModal({name: ModalName.ShowAddressModal}));
  };
  const copyToClipboard = () => {
    if (!modalState.initialState) return;
    setClipboard(modalState.initialState);
    setIsCopied(true);
  };
  const onPressQr = () => {
    if (!modalState.initialState) return;
    setClipboard(modalState.initialState);
    setIsCopied(true);
  };
  return (
    <BottomSheetModal name={ModalName.ShowAddressModal} onClose={close}>
      <View style={styles.container}>
        <Text variant="title1" style={styles.title}>
          Receive
        </Text>
        <TouchableArea style={styles.qrCode} onPress={onPressQr}>
          <QRCode
            size={qr_size}
            style={{height: 'auto', maxWidth: '100%', width: '100%'}}
            value={modalState.initialState ?? ''}
            viewBox={`0 0 ${qr_size} ${qr_size}`}
            level="M"
            fgColor={colors.primary}
          />
        </TouchableArea>
        <Text variant="body2">Scan address to receive payment</Text>
        <TouchableArea style={styles.address} onPress={copyToClipboard}>
          <View style={{width: '70%'}}>
            <Text variant="body3" numberOfLines={1} style={styles.text}>
              {modalState?.initialState}
            </Text>
          </View>
          {isCopied && (
            <Text variant="title4" style={styles.copyText}>
              Copied!
            </Text>
          )}
        </TouchableArea>
      </View>
    </BottomSheetModal>
  );
};

export default ShowAddressModal;

const styles = StyleSheet.create({
  container: {
    padding: spacing.spacing24,
    paddingBottom: spacing.spacing48,
    alignItems: 'center',
  },
  qrCode: {
    width: qr_size,
    height: qr_size,
    borderRadius: borderRad.rounded8,
    backgroundColor: colors.gray,
    marginVertical: spacing.spacing16,
    marginBottom: spacing.spacing36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.spacing8,
  },
  address: {
    paddingHorizontal: spacing.spacing16,
    paddingVertical: spacing.spacing8,
    borderRadius: borderRad.roundedFull,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.spacing8,
  },
  text: {
    color: colors.white,
    fontWeight: '600',
  },
  copyText: {
    color: colors.white,
  },
});
