import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextButtonProps} from '@customTypes';

/**
 * A text component with on press
 * Uses TouchableOpacity to extend touchable area
 */
const TextButton: React.FC<TextButtonProps> = ({
  title,
  onPress,
  activeOpacity = 0.2,
  style,
  textStyle,
  allowFontScaling = true,
  RenderText,
  testID,
}) => {
  return (
    <TouchableOpacity
      testID={testID ? testID : 'TEST_ID'}
      style={[styles.buttonStyle, style]}
      activeOpacity={activeOpacity}
      onPress={onPress}>
      {(() => {
        if (RenderText) {
          return <RenderText />;
        } else {
          return (
            <Text allowFontScaling={allowFontScaling} style={[textStyle]}>
              {title}
            </Text>
          );
        }
      })()}
    </TouchableOpacity>
  );
};

export default React.memo(TextButton);

const styles = StyleSheet.create({
  buttonStyle: {},
});
