import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {Image} from '@components';
import {ImageButtonProps} from '@customTypes';

/**
 * ImageButton component.
 */
const ImageButton: React.FC<ImageButtonProps> = ({
  onPress,
  activeOpacity = 0.2,
  style,
  children,
  source,
  imageStyle,
  type = 'default',
  imageProps,
  resizeMode,
  imageBackgroundProps,
  hasRightChild = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, style]}
      activeOpacity={activeOpacity}
      onPress={onPress}>
      {type === 'default' && source && (
        <Image
          resizeMode={resizeMode}
          {...imageProps}
          source={source}
          style={[imageStyle]}
        />
      )}
      {type === 'background' && source && (
        <ImageBackground
          //@ts-ignore
          source={source}
          style={[imageStyle]}
          {...imageBackgroundProps}>
          {children}
        </ImageBackground>
      )}
      {hasRightChild && children}
    </TouchableOpacity>
  );
};

export default React.memo(ImageButton);

const styles = StyleSheet.create({
  buttonStyle: {},
});
