import {ImageRequireSource, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Picture from '../Picture/Picture';
import {
  GALLERY_GAP_SIZE,
  GALLERY_ITEM_SIZE,
  GALLERY_LIST_COLUMN_NUM,
} from '../../utils/constants/galleryConstants';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../screens/Screen';
import {useAppStackNavigation} from '../../app/navigation/type';

interface ItemProps {
  source: ImageRequireSource;
  index: number;
}

const GalleryListItem = ({source, index}: ItemProps) => {
  const navigation = useAppStackNavigation();
  let startAncestor;
  let startNode;
  const goToDetails = (source: ImageRequireSource) => {
    navigation.navigate(Screens.GalleryDetailScreen, {
      image: source,
    });
  };
  return (
    <TouchableOpacity
      onPress={() => goToDetails(source)}
      style={[
        styles.item,
        {
          marginRight:
            index + 1 / GALLERY_LIST_COLUMN_NUM == 0 ? 0 : GALLERY_GAP_SIZE,
          marginBottom: GALLERY_GAP_SIZE,
        },
      ]}>
      <Picture source={source} style={styles.image} />
    </TouchableOpacity>
  );
};

export default GalleryListItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  item: {
    width: GALLERY_ITEM_SIZE,
    height: GALLERY_ITEM_SIZE,
  },
});
