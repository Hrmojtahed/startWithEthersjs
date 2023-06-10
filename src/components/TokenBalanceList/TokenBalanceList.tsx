import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TokenBalanceItemType} from '../../features/balance/hooks';
import TokenBalanceItem from './TokenBalanceItem';

type Props = {
  tokenList: TokenBalanceItemType[];
  onPressToken: (token: TokenBalanceItemType) => void;
};

const TokenBalanceList = ({tokenList, onPressToken}: Props): JSX.Element => {
  const onPress = (item: TokenBalanceItemType) => onPressToken(item);
  return (
    <View>
      {tokenList.map((item, index) => {
        const {token} = item;
        return (
          <TokenBalanceItem
            item={item}
            key={`token-${token.address}`}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

export default TokenBalanceList;

const styles = StyleSheet.create({});
