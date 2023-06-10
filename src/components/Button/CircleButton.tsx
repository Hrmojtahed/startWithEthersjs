import {StyleSheet, TextStyle, View} from 'react-native';
import React from 'react';
import TouchableArea, {TouchableAreaProps} from './TouchableArea';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {borderRad, iconSizes, spacing} from '../../utils/styles/sizing';
import {colors} from '../../utils/styles/color';
import Text from '../Text/Text';
import {TypograpghiVariant} from '../../utils/styles/typography';
type Props = {
  iconName: string;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  iconSize?: number;
  label?: string;
  labelVariant?: keyof TypograpghiVariant;
  labelStyle?: TextStyle;
} & TouchableAreaProps;
const CircleButton = ({
  iconName,
  iconColor = colors.white,
  iconSize = iconSizes.icon20,
  style,
  size = 45,
  backgroundColor = colors.primary,
  label,
  labelVariant = 'body3',
  labelStyle,
  ...rest
}: Props): JSX.Element => {
  return (
    <View>
      <TouchableArea
        style={[
          styles.default,
          {width: size, height: size, backgroundColor},
          style,
        ]}
        {...rest}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
      </TouchableArea>
      {label && (
        <Text variant={labelVariant} style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRad.roundedFull,
    alignSelf: 'center',
  },
  label: {
    marginTop: spacing.spacing12,
    alignSelf: 'center',
  },
});
