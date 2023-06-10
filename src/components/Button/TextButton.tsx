import {StyleProp, StyleSheet, TextProps, View, ViewStyle} from 'react-native';
import React, {PropsWithChildren, memo} from 'react';
import TouchableArea from './TouchableArea';
import Text from '../Text/Text';
import {SpacingProps, spacing} from '../../utils/styles/sizing';
import {TypograpghiVariant} from '../../utils/styles/typography';
import {TextStyle} from 'react-native';

type Props = PropsWithChildren<{
  onPress?: () => void;
  icon?: JSX.Element;
  iconPosition?: 'right' | 'left';
  iconGap?: keyof SpacingProps;
  variant?: keyof TypograpghiVariant;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: ViewStyle;
}>;

const _TextButton = ({
  children,
  onPress,
  iconPosition = 'left',
  icon,
  iconGap = 'none',
  variant,
  textStyle,
  buttonStyle,
  ...rest
}: Props): JSX.Element => {
  const wrapperStyle: Array<ViewStyle> = [
    styles.container,
    {
      flexDirection: iconPosition == 'left' ? 'row' : 'row-reverse',
    },
    buttonStyle ?? {},
  ];

  return (
    <TouchableArea onPress={onPress} style={wrapperStyle}>
      {icon}
      {icon && (
        <View
          style={{marginHorizontal: spacing[iconGap] ?? spacing.spacing2}}
        />
      )}
      <Text variant={variant ?? 'title3'} style={textStyle} {...rest}>
        {children}
      </Text>
    </TouchableArea>
  );
};

export const TextButton = memo(_TextButton);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
