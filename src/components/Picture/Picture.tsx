import {StyleSheet} from 'react-native';
import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

const Picture = (props: FastImageProps) => {
  return <FastImage {...props} />;
};

export default Picture;

const styles = StyleSheet.create({});
