import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TypograpghiVariant} from '../utils/styles/typography';
import Text from './Text/Text';
import {spacing} from '../utils/styles/sizing';
import {colors} from '../utils/styles/color';
import {TouchableOpacity} from 'react-native';
import {setClipboard} from '../utils/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logger} from '../utils/logger';
type Props = {
  address: string;
  variant?: keyof TypograpghiVariant;
  showCopy?: boolean;
};

const CopyIconWrapper = ({
  onPress,
  children,
}: {
  onPress?: () => void;
  children: React.ReactElement;
}) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }
  return <>{children}</>;
};
const CopyIcon = () => {
  return (
    <Ionicons
      name="copy-outline"
      size={22}
      color={colors.primary}
      style={{marginHorizontal: spacing.spacing4}}
    />
  );
};

const AddressDisplay: React.FC<Props> = ({
  address,
  variant,
  showCopy = true,
}) => {
  const onPressCopy = () => {
    if (!address) return;
    logger.debug('AddressDisplay', 'onPressCopy', 'Log clipboard', address);
    setClipboard(address);
  };
  return (
    <CopyIconWrapper onPress={showCopy ? onPressCopy : undefined}>
      <View style={[styles.container]}>
        <View style={{flex: 1}}>
          <Text
            variant={variant ?? 'body2'}
            style={styles.address}
            numberOfLines={1}>
            {address}
          </Text>
        </View>
        {showCopy && <CopyIcon />}
      </View>
    </CopyIconWrapper>
  );
};

export default AddressDisplay;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    color: colors.gray,
  },
});
