import {
  ActivityIndicator,
  ColorValue,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import {Typography} from '../../utils/styles/typography';

type Props = {
  loading: boolean;
  backdropOpacity?: number;
  indicatorColor?: ColorValue;
};

const OverlayLoading: React.FC<Props> = ({
  loading,
  backdropOpacity = 0.5,
  indicatorColor = colors.white,
}) => {
  return loading ? (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(0,0,0,${backdropOpacity})`},
      ]}>
      <ActivityIndicator
        animating={loading}
        size={'large'}
        color={indicatorColor}
      />
      <Text style={[Typography.body2, {color: indicatorColor, marginTop: 12}]}>
        Please Wait...
      </Text>
    </View>
  ) : null;
};

export default OverlayLoading;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 10,
  },
});
