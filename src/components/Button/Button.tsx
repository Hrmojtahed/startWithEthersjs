import {
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {ButtonEmphasis, ButtonSize, ButtonType, ButtonTypeEnum} from './type';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../utils/styles/color';
import {Typography} from '../../utils/styles/typography';
import {ActivityIndicator} from 'react-native';
import {borderRad, spacing} from '../../utils/styles/sizing';
import {getButtonProperties} from './utils';
import Text from '../Text/Text';
import {StyleProp} from 'react-native';

type ButtonCustomStyle = {
  Button?: ViewStyle;
  Label?: TextStyle;
};

type Props = TouchableOpacityProps & {
  type?: ButtonType;
  label?: string;
  icon?: JSX.Element;
  customStyle?: ButtonCustomStyle;
  loading?: boolean;
  fill?: boolean;
  size?: ButtonSize;
  emphasis?: ButtonEmphasis;
};

const _Button: React.FC<Props> = ({
  type = 'normal',
  size = ButtonSize.Medium,
  emphasis = ButtonEmphasis.Primary,
  fill = false,
  icon,
  label,
  customStyle,
  disabled,
  loading,
  ...props
}) => {
  const {
    backgroundColor,
    textColor,
    textVariant,
    paddingX,
    paddingY,
    borderRadius,
    borderColor,
    iconPadding,
  } = getButtonProperties(size, type, emphasis);

  const ButtonStyle: Array<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: backgroundColor,
      paddingHorizontal: spacing[paddingX],
      paddingVertical: spacing[paddingY],
      borderRadius: borderRad[borderRadius],
      borderColor,
      borderWidth: 1,
      flex: fill ? 1 : undefined,
      opacity: disabled ? 0.5 : 1,
    },
    customStyle?.Button ?? {},
  ];
  const LabelStyle: StyleProp<Array<TextStyle>> = [
    {
      color: textColor,
    },
    customStyle?.Label ?? {},
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      {...props}
      style={ButtonStyle}>
      {loading ? (
        <ActivityIndicator
          animating={loading}
          color={colors.white}
          style={{marginRight: spacing[iconPadding]}}
        />
      ) : null}
      {icon}
      {icon && <View style={{width: spacing[iconPadding]}} />}
      {label && (
        <Text variant={textVariant} style={LabelStyle}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export const Button = memo(_Button);

const styles = StyleSheet.create({});
