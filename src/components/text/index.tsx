import React from 'react';
import {Text as RNText} from 'react-native';
import {FontFamily, FontSize} from '@constants';
import {TextComponentProps} from '@customTypes';
/**
 * Text component.
 */

interface TextProps extends TextComponentProps {
  size?: keyof typeof FontSize;
  type?: keyof typeof FontFamily;
}
const Text: React.FC<TextProps> = ({
  children,
  title,
  style,
  size = 'h4',
  type = 'regular',
}) => {
  return (
    <RNText
      style={[
        {
          fontSize: FontSize[size],
          fontFamily: FontFamily[type],
        },
        style,
      ]}>
      {children ? children : title}
    </RNText>
  );
};

export default React.memo(Text);
