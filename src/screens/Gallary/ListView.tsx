import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/styles/color';
import {FlatList} from 'react-native';
import {ImageList} from '../../assets/images';
import GalleryListItem from '../../components/Gallery/GalleryListItem';
import {GALLERY_LIST_COLUMN_NUM} from '../../utils/constants/galleryConstants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface componentProps {
  // navigation: NativeStackScreenProps<any>;
}

const ListView = ({}: componentProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        key={GALLERY_LIST_COLUMN_NUM}
        data={ImageList}
        extraData={ImageList}
        keyExtractor={(item, index) => `listItem-${index}`}
        renderItem={({item, index}) => (
          <GalleryListItem source={item} index={index} />
        )}
        numColumns={GALLERY_LIST_COLUMN_NUM}
        // ItemSeparatorComponent={}
      />
    </View>
  );
};

export default ListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});
