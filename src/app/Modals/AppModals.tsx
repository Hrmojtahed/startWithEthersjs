import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ModalWrapper} from '../../components/Modal/ModalWrapper';
import ExplorerAccountModal from './ExplorerAccountModal';
import {ModalName} from './constants';
import MintModal from './MintModal';
import ApprovedTransactionModal from './ApprovedTransactionModal';
import ShowAddressModal from './ShowAddressModal';
import SendModal from './SendModal';
import {useAppDispatch} from '../../store/hooks';
import {closeAllModal} from '../../features/modals/modalSlice';
import ErrorModal from './ErrorModal';

const AppModals = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(closeAllModal());
  }, []);
  return (
    <>
      <ErrorModal />
      <ModalWrapper name={ModalName.SendModal}>
        <SendModal />
      </ModalWrapper>
      <ModalWrapper name={ModalName.ShowAddressModal}>
        <ShowAddressModal />
      </ModalWrapper>
      <ApprovedTransactionModal></ApprovedTransactionModal>
      <ModalWrapper name={ModalName.MintModal}>
        <MintModal />
      </ModalWrapper>
      <ModalWrapper name={ModalName.AccountModal}>
        <ExplorerAccountModal />
      </ModalWrapper>
    </>
  );
};

export default AppModals;

const styles = StyleSheet.create({});
