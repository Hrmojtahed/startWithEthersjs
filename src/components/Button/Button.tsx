import {
  ButtonProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {Children} from 'react';
import {ButtonType, ButtonTypeEnum} from './type';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../utils/styles/color';
import {Typography} from '../../utils/styles/typography';

type Props = TouchableOpacityProps & {
  type?: ButtonType;
  text?: string;
  children?: JSX.Element;
  icon?: JSX.Element;

  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const Button: React.FC<Props> = ({
  type = 'fill',

  text,
  buttonStyle,
  textStyle,
  children,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={[
        styles.btnDefault,
        type == ButtonTypeEnum.Outline ? styles.outlineBtn : {},
        disabled ? styles.disabled : {},
        buttonStyle,
      ]}>
      {text && (
        <Text
          style={[
            styles.defaultText,
            type == ButtonTypeEnum.Outline ? styles.outlineText : {},
          ]}>
          {text}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnDefault: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 15,
    width: '100%',
  },
  outlineBtn: {
    borderWidth: 1,
    backgroundColor: colors.none,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  defaultText: {
    ...Typography.title3,
    color: colors.lightGray,
  },
  outlineText: {
    color: colors.primary,
  },
});
