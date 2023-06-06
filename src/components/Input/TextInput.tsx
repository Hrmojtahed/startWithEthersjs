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
} & TextInputProps;

const TextInput: React.FC<Props> = ({
  style,
  containerStyle,
  label,
  labelStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInputBase
        style={[styles.default, style]}
        placeholderTextColor={colors.gray}
        {...props}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  default: {
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
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
  container: {
    width: '100%',
  },
});
