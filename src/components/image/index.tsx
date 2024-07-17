import React from 'react';
import FastImage from 'react-native-fast-image';
import {ImageProps} from '@customTypes';
/**
 * Common Image component.
 */

const Image: React.FC<ImageProps> = props => {
  return <FastImage {...props} />;
};

export default React.memo(Image);
