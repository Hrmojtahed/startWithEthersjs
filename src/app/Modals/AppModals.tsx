import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ModalWrapper} from '../../components/Modal/ModalWrapper';
import ExplorerAccountModal from './ExplorerAccountModal';
import {ModalName} from './constants';

const AppModals = () => {
  return (
    <>
      <ModalWrapper name={ModalName.AccountModal}>
        <ExplorerAccountModal />
      </ModalWrapper>
    </>
  );
};

export default AppModals;

const styles = StyleSheet.create({});
