import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ModalName} from './constants';
import {RootState} from '../../store/store';

export type OpenModalParams = {
  name: ModalName;
  initialState?: undefined;
};

export interface AppModalState<T> {
  isOpen: boolean;
  initialState?: T;
}
export interface ModalState {
  [ModalName.AccountModal]: AppModalState<undefined>;
}
export const initialModalState: ModalState = {
  [ModalName.AccountModal]: {
    isOpen: false,
    initialState: undefined,
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
    closeAllModal: (state, action) => {},
  },
});

export function selectModalState<T extends keyof ModalState>(
  name: T,
): (state: RootState) => ModalState[T] {
  return state => state.modals[name];
}

export default modalReducer.reducer;
export const {openModal, closeModal, closeAllModal} = modalReducer.actions;
