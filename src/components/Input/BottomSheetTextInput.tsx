import {
  StyleSheet,
  Text,
  TextInputProps,
  View,
  TextInput as TextInputBase,
  TextStyle,
} from 'react-native';
import React, {useCallback} from 'react';
import {colors} from '../../utils/styles/color';
import {ViewStyle} from 'react-native';
import {useBottomSheetInternal} from '@gorhom/bottom-sheet';

type Props = {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
} & TextInputProps;

const BottomSheetTextInput: React.FC<Props> = ({
  style,
  containerStyle,
  label,
  labelStyle,
  icon,
  iconPosition,
  onFocus,
  onBlur,
  ...props
}) => {
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();
  const handleOnFocus = useCallback(
    (args: any) => {
      shouldHandleKeyboardEvents.value = true;
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, shouldHandleKeyboardEvents],
  );
  const handleOnBlur = useCallback(
    (args: any) => {
      shouldHandleKeyboardEvents.value = false;
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, shouldHandleKeyboardEvents],
  );
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
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          {...props}
        />
      </View>
    </View>
  );
};

export default BottomSheetTextInput;

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