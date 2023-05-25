import {
  ButtonProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ButtonType} from './type';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../utils/styles/color';

type Props = {
  type: ButtonType;
  text?: string;
  children?: JSX.Element;
  icon?: JSX.Element;
  otherProps?: TouchableOpacityProps;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const Button: React.FC<Props> = ({
  type,
  otherProps,
  text,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      {...otherProps}
      style={[
        styles.btnDefault,
        type == ButtonType.Outline ? styles.outlineBtn : {},
        otherProps?.disabled ? styles.disabled : {},
        buttonStyle,
      ]}>
      {text && (
        <Text
          style={[
            styles.defaultText,
            type == ButtonType.Outline ? styles.outlineText : {},
          ]}>
          {text}
        </Text>
      )}
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
    color: colors.lightGray,
    fontSize: 14,
    fontWeight: 'bold',
  },
  outlineText: {
    color: colors.primary,
  },
});
