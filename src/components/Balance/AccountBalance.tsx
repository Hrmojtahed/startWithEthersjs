import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {TokenBalanceItemType} from '../../features/balance/hooks';
import Avatar from '../Avatar/Avatar';
import {spacing} from '../../utils/styles/sizing';
import Text from '../Text/Text';

type Props = {
  item: TokenBalanceItemType;
  style?: ViewStyle | undefined;
};

const AccountBalance = ({item, style}: Props): JSX.Element => {
  if (!item) return <></>;
  const {token, balance} = item;
  return (
    <View style={[styles.container, style]}>
      <Avatar
        size={55}
        name={token.name?.slice(0, 1) ?? ''}
        style={styles.avatar}
      />
      <Text variant="title2" style={styles.text}>
        {token?.name}
      </Text>
      <Text variant="body3">{balance + ' ' + token?.symbol}</Text>
    </View>
  );
};

export default AccountBalance;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: spacing.spacing16,
  },
  text: {
    marginBottom: spacing.spacing8,
  },
});
