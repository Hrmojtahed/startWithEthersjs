import React, {PropsWithChildren} from 'react';
import {ModalState, selectModalState} from '../../features/modals/modalSlice';
import {useAppSelector} from '../../store/hooks';

type Props = {
  name: keyof ModalState;
  children: JSX.Element;
};

export function ModalWrapper({children, name}: Props): JSX.Element | null {
  const modalState = useAppSelector(selectModalState(name));

  if (!modalState?.isOpen) {
    return null;
  }
  return children;
}
