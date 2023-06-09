import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ModalName} from '../../app/Modals/constants';
import {RootState} from '../../store/store';
import {Token} from '@uniswap/sdk-core';

import {TransactionState} from '../transaction/type';
import {getKeys} from '../../utils/objects';

interface ErrorModalType {
  error: string;
  message: string;
}

export type OpenModalParams =
  | AccountModalParams
  | MintModalParams
  | ApprovedTransactionModal
  | SendModalParams
  | ShowAddressModalParams
  | ErrorModalParams;

type AccountModalParams = {
  name: ModalName.AccountModal;
  initialState?: undefined;
};
type MintModalParams = {name: ModalName.MintModal; initialState?: Token};
type SendModalParams = {name: ModalName.SendModal; initialState?: undefined};
type ShowAddressModalParams = {
  name: ModalName.ShowAddressModal;
  initialState?: Address;
};
type ErrorModalParams = {
  name: ModalName.ErrorModal;
  initialState: ErrorModalType;
};

type ApprovedTransactionModal = {
  name: ModalName.ApprovedTransactionModal;
  initialState?: TransactionState;
};
export interface AppModalState<T> {
  isOpen: boolean;
  initialState?: T;
}
export interface ModalState {
  [ModalName.AccountModal]: AppModalState<undefined>;
  [ModalName.MintModal]: AppModalState<Token>;
  [ModalName.ApprovedTransactionModal]: AppModalState<TransactionState>;
  [ModalName.ShowAddressModal]: AppModalState<Address>;
  [ModalName.SendModal]: AppModalState<undefined>;
  [ModalName.ErrorModal]: AppModalState<ErrorModalType>;
}
export const initialModalState: ModalState = {
  [ModalName.AccountModal]: {
    isOpen: false,
    initialState: undefined,
  },
  [ModalName.MintModal]: {
    isOpen: false,
  },
  [ModalName.ApprovedTransactionModal]: {
    isOpen: false,
  },
  [ModalName.ShowAddressModal]: {
    isOpen: false,
  },
  [ModalName.SendModal]: {
    isOpen: false,
  },
  [ModalName.ErrorModal]: {
    isOpen: false,
  },
};

const modalReducer = createSlice({
  name: 'modals',
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalParams>) => {
      const {name, initialState} = action.payload;
      state[name].isOpen = true;
      state[name].initialState = initialState;
    },
    closeModal: (state, action: PayloadAction<{name: keyof ModalState}>) => {
      const {name} = action.payload;
      state[name].isOpen = false;
      state[name].initialState = undefined;
    },
    closeAllModal: state => {
      getKeys(state).forEach(modalName => {
        state[modalName].isOpen = false;
        state[modalName].initialState = undefined;
      });
    },
  },
});

export function selectModalState<T extends keyof ModalState>(
  name: T,
): (state: RootState) => ModalState[T] {
  return state => state.modals[name];
}

export default modalReducer.reducer;
export const {openModal, closeModal, closeAllModal} = modalReducer.actions;
