import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import Text from '../Text/Text';
import {spacing} from '../../utils/styles/sizing';

type Props = {
  loading: boolean;
  backgroundColor?: string;
  color?: string;
  label?: string;
  hasLabel?: boolean;
  opacity?: number;
};

const OverlayLoading = ({
  loading,
  backgroundColor,
  opacity = 0.7,
  color = colors.primary,
  label = 'Please wait...',
  hasLabel = true,
}: Props): JSX.Element => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: backgroundColor ?? `rgba(255,255,255,${opacity})`},
      ]}>
      <ActivityIndicator animating={loading} color={color} />
      {hasLabel && <Text style={[styles.text, {color}]}>{label}</Text>}
    </View>
  );
};

export default OverlayLoading;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: spacing.spacing12,
  },
});
