import {
  StyleSheet,
  Text,
  TextInputProps,
  View,
  TextInput as TextInputBase,
  TextStyle,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import {ViewStyle} from 'react-native';

type Props = {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: React.ReactElement;
  iconPosition: 'left' | 'right';
} & TextInputProps;

const TextInput: React.FC<Props> = ({
  style,
  containerStyle,
  label,
  labelStyle,
  icon,
  iconPosition,
  ...props
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View
        style={[
          styles.container,
          {flexDirection: iconPosition == 'left' ? 'row' : 'row-reverse'},
        ]}>
        {icon}
        {icon && <View style={styles.seprator} />}
        <TextInputBase
          style={[styles.inputDefaultStyle, style]}
          placeholderTextColor={colors.gray}
          {...props}
        />
      </View>
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
    width: 16,
  },
});
