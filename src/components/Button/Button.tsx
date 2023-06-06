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
import {ActivityIndicator} from 'react-native';
import {spacing} from '../../utils/styles/sizing';

type Props = TouchableOpacityProps & {
  type?: ButtonType;
  text?: string;
  children?: JSX.Element;
  icon?: JSX.Element;

  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
};

const Button: React.FC<Props> = ({
  type = 'fill',

  text,
  buttonStyle,
  textStyle,
  children,
  disabled,
  loading,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      {...props}
      style={[
        styles.btnDefault,
        type == ButtonTypeEnum.Outline ? styles.outlineBtn : {},
        disabled ? styles.disabled : {},
        buttonStyle,
      ]}>
      {loading ? (
        <ActivityIndicator
          animating={loading}
          color={colors.white}
          style={styles.loading}
        />
      ) : null}
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
  loading: {
    marginRight: spacing.spacing8,
  },
});
