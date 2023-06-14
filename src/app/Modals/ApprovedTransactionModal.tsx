import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {borderRad, iconSizes, spacing} from '../../utils/styles/sizing';
import {colors} from '../../utils/styles/color';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeModal, selectModalState} from '../../features/modals/modalSlice';
import {ModalName} from './constants';
import Text from '../../components/Text/Text';
import {Button} from '../../components/Button/Button';
import {ethers} from 'ethers';
import {Delay, Delayed} from '../../components/Layout/Delayed';
import CircleButton from '../../components/Button/CircleButton';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import {ButtonEmphasis, ButtonSize} from '../../components/Button/type';
import {TextButton} from '../../components/Button/TextButton';
import {setClipboard} from '../../utils/clipboard';
import {
  openLinkInBrowser,
  polyganMumbaiExplorerLink,
} from '../../features/linking/utils';

const {width, height} = Dimensions.get('window');

type Props = {
  isVisible: boolean;
};

const ApprovedTransactionModal = (): JSX.Element => {
  const [btnCopyLabel, setBtnCopyLabel] = useState<'Copy' | 'Copied!'>('Copy');
  const dispatch = useAppDispatch();
  const modalState = useAppSelector(
    selectModalState(ModalName.ApprovedTransactionModal),
  );

  const hash = modalState.initialState?.hash;

  const close = (): void => {
    setBtnCopyLabel('Copy');
    dispatch(closeModal({name: ModalName.ApprovedTransactionModal}));
  };
  const copyToClipboard = () => {
    setClipboard(hash ?? '');
    setBtnCopyLabel('Copied!');
  };
  const openPolyganScan = () => {
    if (!hash) return;
    openLinkInBrowser(polyganMumbaiExplorerLink(hash));
  };

  return (
    <Modal
      isVisible={modalState?.isOpen}
      onBackdropPress={close}
      animationIn={'slideInUp'}
      animationOut={'slideOutUp'}>
      <View style={styles.container}>
        <Icon
          name="close"
          size={iconSizes.icon24}
          color={colors.primary}
          style={styles.closeBtn}
          onPress={close}
        />
        <IconFeather
          name={'check-circle'}
          color={colors.green}
          size={iconSizes.icon64}
          style={styles.check}
        />
        <Text variant="title2">Transaction is seccessful</Text>
        <Text variant="body2" style={styles.subtitle}>
          Transaction Hash:
        </Text>
        <TextButton
          onPress={copyToClipboard}
          variant="title3"
          buttonStyle={styles.btn}
          textStyle={{textAlign: 'center'}}>
          {modalState.initialState?.hash}
        </TextButton>

        <View style={styles.row}>
          <Button
            label={btnCopyLabel}
            onPress={copyToClipboard}
            size={ButtonSize.Small}
            emphasis={ButtonEmphasis.Warning}
            type={'outline'}
          />
          <Button
            label={'Polygan Scan'}
            onPress={openPolyganScan}
            size={ButtonSize.Small}
            emphasis={ButtonEmphasis.Success}
            type={'outline'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ApprovedTransactionModal;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width * 0.9,
    // height: 300,
    borderRadius: borderRad.rounded16,
    backgroundColor: colors.white,
    padding: spacing.spacing24,
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  check: {
    marginTop: spacing.spacing12,
    marginBottom: spacing.spacing16,
  },
  subtitle: {
    marginTop: spacing.spacing36,
    marginBottom: spacing.spacing12,
  },
  btn: {
    marginBottom: spacing.spacing12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingTop: spacing.spacing12,
  },
});
