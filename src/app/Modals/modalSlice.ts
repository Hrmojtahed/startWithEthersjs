import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ModalName} from './constants';
import {RootState} from '../../store/store';

export type OpenModalParams = {
  name: ModalName;
  initialState?: undefined;
};

export interface AppModalState<T> {
  isOpen: boolean;
  initialState: T;
}
export interface ModalState {
  [ModalName.AccountModal]: AppModalState<undefined>;
}
const initialModalState: ModalState = {
  [ModalName.AccountModal]: {
    isOpen: false,
    initialState: undefined,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalParams>) => {},
    closeModal: (state, action: PayloadAction<{name: keyof ModalState}>) => {},
    closeAllModal: (state, action) => {},
  },
});

export function selectModalState<T extends keyof ModalState>(
  name: T,
): (state: RootState) => ModalState[T] {
  return state => state.modals[name];
}

export default modalSlice.reducer;
export const {} = modalSlice.actions;
