import {StyleSheet, Text as TextBase, TextStyle, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {TextProps} from 'react-native';
import {TypograpghiVariant, Typography} from '../../utils/styles/typography';

type Props = TextProps &
  PropsWithChildren<{
    variant?: keyof TypograpghiVariant;
  }>;

const Text: React.FC<Props> = ({children, style, variant, ...rest}) => {
  return (
    <TextBase style={[Typography[variant ?? 'body3'], style]} {...rest}>
      {children}
    </TextBase>
  );
};

export default Text;

const styles = StyleSheet.create({});
