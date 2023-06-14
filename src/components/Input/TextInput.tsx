import {
  StyleSheet,
  TextInputProps as BaseTextInputProps,
  View,
  TextInput as TextInputBase,
  TextStyle,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import {ViewStyle} from 'react-native';

import Text from '../Text/Text';
import {spacing} from '../../utils/styles/sizing';

export type TextInputProps = {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  error?: boolean;
  errorText?: string;
} & BaseTextInputProps;

const TextInput: React.FC<TextInputProps> = ({
  style,
  containerStyle,
  label,
  labelStyle,
  icon,
  iconPosition,
  error,
  errorText,
  ...props
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      </View>
      <View
        style={[
          styles.container,
          {flexDirection: iconPosition == 'left' ? 'row' : 'row-reverse'},
          {borderColor: error ? colors.red : colors.primary},
        ]}>
        {icon}
        {icon && <View style={styles.seprator} />}
        <TextInputBase
          style={[styles.inputDefaultStyle, style]}
          placeholderTextColor={colors.gray}
          {...props}
        />
      </View>
      {error ? (
        <Text style={styles.errorLabel} variant="subtitle1">
          {errorText}
        </Text>
      ) : (
        <View style={styles.gap} />
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputDefaultStyle: {
    height: '100%',
    flex: 1,
    backgroundColor: colors.none,
    color: colors.primary,
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 4,
    paddingLeft: 4,
  },
  seprator: {
    width: spacing.spacing16,
  },
  gap: {
    height: 24,
  },
  errorLabel: {
    marginLeft: spacing.spacing12,
    marginTop: spacing.spacing2,
    marginBottom: spacing.spacing8,
    color: colors.red,
    fontWeight: '500',
    letterSpacing: 0.2,
    width: '100%',
    fontSize: 13,
  },
});
