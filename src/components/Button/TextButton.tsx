import {StyleSheet, TextProps, View, ViewStyle} from 'react-native';
import React, {PropsWithChildren} from 'react';
import TouchableArea from './TouchableArea';
import Text from '../Text/Text';
import {SpacingProps, spacing} from '../../utils/styles/sizing';
import {TypograpghiVariant} from '../../utils/styles/typography';

type Props = PropsWithChildren<{
  onPress?: () => void;
  icon?: JSX.Element;
  iconPosition?: 'right' | 'left';
  iconGap?: keyof SpacingProps;
  variant?: keyof TypograpghiVariant;
}> &
  TextProps;

const TextButton = ({
  children,
  onPress,
  iconPosition = 'left',
  icon,
  iconGap = 'none',
  variant,
  ...rest
}: Props): JSX.Element => {
  const wrapperStyle: ViewStyle[] = [
    styles.container,
    {
      flexDirection: iconPosition == 'left' ? 'row' : 'row-reverse',
    },
  ];

  return (
    <TouchableArea onPress={onPress} style={wrapperStyle}>
      {icon}
      {icon && (
        <View
          style={{marginHorizontal: spacing[iconGap] ?? spacing.spacing2}}
        />
      )}
      <Text variant={variant ?? 'title3'} {...rest}>
        {children}
      </Text>
    </TouchableArea>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
