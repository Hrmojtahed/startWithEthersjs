import {ImageRequireSource} from 'react-native';
import {HomeScreens, GalleryScreens} from '../../screens/screen';

export type RootStackParamList = {
  [HomeScreens.Home]: undefined;
  [GalleryScreens.ListView]: undefined;
  [GalleryScreens.DetailView]: {image: ImageRequireSource};
};
