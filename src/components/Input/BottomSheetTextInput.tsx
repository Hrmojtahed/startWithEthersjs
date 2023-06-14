import React, {useCallback} from 'react';
import {useBottomSheetInternal} from '@gorhom/bottom-sheet';
import TextInput, {TextInputProps} from './TextInput';

const BottomSheetTextInput: React.FC<TextInputProps> = ({
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
  return <TextInput onFocus={handleOnFocus} onBlur={handleOnBlur} {...props} />;
};

export default BottomSheetTextInput;
