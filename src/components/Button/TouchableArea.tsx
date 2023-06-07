import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

export type TouchableAreaProps = PropsWithChildren<{}> & TouchableOpacityProps;

const TouchableArea = ({
  children,
  onPress,
  ...rest
}: TouchableAreaProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableArea;

const styles = StyleSheet.create({});
