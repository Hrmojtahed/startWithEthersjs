import {Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('screen');

export const GALLERY_LIST_COLUMN_NUM = 3;
export const GALLERY_GAP_SIZE = 2;
export const GALLERY_ITEM_SIZE =
  (screenWidth - 2 * GALLERY_GAP_SIZE) / GALLERY_LIST_COLUMN_NUM;
