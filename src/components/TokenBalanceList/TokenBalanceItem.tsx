import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TokenBalanceItemType} from '../../features/balance/hooks';
import TouchableArea from '../Button/TouchableArea';
import {spacing} from '../../utils/styles/sizing';
import Avatar from '../Avatar/Avatar';
import Text from '../Text/Text';
import {Button} from '../Button/Button';
import {ButtonEmphasis, ButtonSize} from '../Button/type';

type Props = {
  item: TokenBalanceItemType;
  onPress: (token: TokenBalanceItemType) => void;
  disabled?: boolean;
  onMintToken?: (token: TokenBalanceItemType) => void;
  mintable?: boolean;
};

const TokenBalanceItem = ({
  item,
  onPress,
  disabled,
  onMintToken,
  mintable,
}: Props): JSX.Element => {
  if (!item) return <></>;
  const {token, balance} = item;

  return (
    <TouchableArea
      style={styles.container}
      onPress={() => onPress(item)}
      disabled={disabled}>
      <Avatar
        size={45}
        name={token.name ?? 'Token'}
        style={{marginRight: spacing.spacing16}}
      />
      <View style={styles.textContainer}>
        <Text variant="title3" style={{marginBottom: spacing.spacing4}}>
          {token.name}
        </Text>
        <Text variant="subtitle1" selectable>
          {balance + ' ' + token.symbol}
        </Text>
      </View>
      {mintable && (
        <Button
          label="Mint"
          size={ButtonSize.Small}
          emphasis={ButtonEmphasis.Success}
          type="outline"
          // fill={true}
          onPress={() => onMintToken?.(item)}
        />
      )}
    </TouchableArea>
  );
};

export default TokenBalanceItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
});
