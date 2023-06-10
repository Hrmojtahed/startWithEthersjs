import {View, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import {SpacingProps, spacing} from '../../utils/styles/sizing';

type Props = {
  width?: number | string;
  height?: number;
  color?: string;

  style?: ViewStyle;
  gap?: keyof SpacingProps;
};

const Seprator = ({
  width,
  height = 1,
  color = colors.gray,

  style,
  gap,
}: Props): JSX.Element => {
  return (
    <View
      style={[
        {
          width: width ?? '100%',
          height,
          backgroundColor: color,
          marginVertical: spacing[gap ?? 'spacing4'],
          borderRadius: height / 2,
          alignSelf: 'center',
        },
        style,
      ]}
    />
  );
};

export default Seprator;
