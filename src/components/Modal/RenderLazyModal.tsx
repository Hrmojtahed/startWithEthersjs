import React, {PropsWithChildren} from 'react';
import {ModalState, selectModalState} from '../../app/Modals/modalSlice';
import {useAppSelector} from '../../store/hooks';

type Props = {
  name: keyof ModalState;
  children: JSX.Element;
};

export function RenderLazyModal({children, name}: Props): JSX.Element | null {
  const modalState = useAppSelector(selectModalState(name));

  if (!modalState.isOpen) {
    return null;
  }
  return children;
}
