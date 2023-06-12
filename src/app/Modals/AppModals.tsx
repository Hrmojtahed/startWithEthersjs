import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ModalWrapper} from '../../components/Modal/ModalWrapper';
import ExplorerAccountModal from './ExplorerAccountModal';
import {ModalName} from './constants';
import MintModal from './MintModal';
import ApprovedTransactionModal from './ApprovedTransactionModal';

const AppModals = () => {
  return (
    <>
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
