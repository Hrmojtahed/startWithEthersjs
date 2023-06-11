import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TokenBalanceItemType} from '../../features/balance/hooks';
import TokenBalanceItem from './TokenBalanceItem';
import {tokenHasMintFunction} from '../../features/transfer/utils';
import {Token} from '@uniswap/sdk-core';
import {useAppDispatch} from '../../store/hooks';
import {openModal} from '../../features/modals/modalSlice';
import {ModalName} from '../../app/Modals/constants';

type Props = {
  tokenList: TokenBalanceItemType[];
  onPressToken: (token: TokenBalanceItemType) => void;
};

const TokenBalanceList = ({tokenList, onPressToken}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const onPress = (item: TokenBalanceItemType) => onPressToken(item);

  const openMintModal = async (token: Token) => {
    dispatch(openModal({name: ModalName.MintModal, initialState: token}));
  };
  return (
    <View>
      {tokenList.map((item, index) => {
        const {token} = item;

        return (
          <TokenBalanceItem
            item={item}
            key={`token-${token.address}`}
            onPress={onPress}
            mintable={item.token.symbol === 'GLD'}
            onMintToken={() => openMintModal(item.token)}
          />
        );
      })}
    </View>
  );
};

export default TokenBalanceList;

const styles = StyleSheet.create({});
