import {StyleProp, TextStyle} from 'react-native';
import {colors} from './color';

type StyleType = {
  title1: TextStyle;
  title2: TextStyle;
  title3: TextStyle;
  title4: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  body3: TextStyle;
  subtitle1: TextStyle;
  subtitle2: TextStyle;
};

export const Typography: StyleType = {
  title1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  title3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  title4: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  body1: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.gray,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal',
    color: colors.gray,
  },
  body3: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.gray,
  },
  subtitle1: {
    fontSize: 12,
    fontWeight: '300',
    color: colors.lightGray,
  },
  subtitle2: {
    fontSize: 10,
    fontWeight: '300',
    color: colors.lightGray,
  },
};
