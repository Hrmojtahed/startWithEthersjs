import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {getTextSize} from './utils';
import Text from '../Text/Text';
import {colors} from '../../utils/styles/color';

type Props = {
  name: string;
  size?: number;
  randomColor?: boolean;
  color?: string;
  style?: ViewStyle | undefined;
};

const Avatar = ({
  name,
  size = 55,
  randomColor,
  color,
  style,
}: Props): JSX.Element => {
  const textVariant = getTextSize(size);
  const circleStyle: ViewStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
  };
  return (
    <View style={[circleStyle, style]}>
      <Text variant={textVariant}>{name.slice(0, 1)}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
