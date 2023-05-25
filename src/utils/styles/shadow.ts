import {ViewStyle} from 'react-native';
import {colors} from './color';

type ShadowType = {
  xs: ViewStyle;
  s: ViewStyle;
  m: ViewStyle;
  lg: ViewStyle;
};

export const Shadow: ShadowType = {
  xs: {
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  s: {
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  m: {
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  lg: {
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
};
