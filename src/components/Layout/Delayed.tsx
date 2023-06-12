import {PropsWithChildren, useReducer} from 'react';
import {useTimeout} from '../../utils/timing';
export enum Delay {
  Short = 500,
  Normal = 2500,
  Long = 5000,
}

type Props = {
  children: JSX.Element;
  waitBeforeShow?: Delay;
};
export const Delayed = ({
  children,
  waitBeforeShow = Delay.Short,
}: PropsWithChildren<Props>): JSX.Element | null => {
  const [isShown, setIsShown] = useReducer(() => true, false);

  useTimeout(setIsShown, waitBeforeShow);

  return isShown ? children : null;
};
