import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {Token} from '@uniswap/sdk-core';
import TouchableArea from '../Button/TouchableArea';
import {colors} from '../../utils/styles/color';
import {borderRad, spacing} from '../../utils/styles/sizing';
import Text from '../Text/Text';
type Props = {
  tokenList: Token[];
  onSelect?: (index: number) => void;
  style?: ViewStyle;
  selected?: number;
};
const TokenSelectInput = ({
  tokenList,
  onSelect,
  selected,
  style,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectToken = (index: number) => {
    if (onSelect) onSelect(index);
    setIsOpen(false);
  };
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Select Token</Text>
      <TouchableArea
        style={styles.inputField}
        onPress={() => setIsOpen(!isOpen)}>
        <Text variant="title3">{tokenList[selected ?? 0].name}</Text>
      </TouchableArea>
      {isOpen && (
        <View style={styles.listContainer}>
          {tokenList.map((item, index) => (
            <TouchableArea
              style={styles.item}
              onPress={() => selectToken(index)}>
              <Text variant="title3">{item.name}</Text>
              <Text variant="body3">{` (${item.symbol})`}</Text>
            </TouchableArea>
          ))}
        </View>
      )}
    </View>
  );
};

export default TokenSelectInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputField: {
    height: 45,
    borderRadius: borderRad.rounded12,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: spacing.spacing16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%',
    marginTop: spacing.spacing12,
    borderRadius: borderRad.rounded12,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 4,
    paddingLeft: 4,
  },
  item: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.spacing12,
  },
});
