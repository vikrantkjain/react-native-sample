import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Images} from '@constants';
import {ImageButton} from '@components';
import {CheckBoxProps} from '@customTypes';
/**
 * Checkbox component.
 */
const CheckBox: React.FC<CheckBoxProps> = ({
  children,
  style,
  checkedImage,
  uncheckedImage,
  checkedImageStyle,
  uncheckedImageStyle,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const toggleCheck = () => setChecked(!checked);

  return (
    <ImageButton
      hasRightChild
      style={[style]}
      onPress={toggleCheck}
      imageStyle={[
        styles.imageStyle,
        checked ? checkedImageStyle : uncheckedImageStyle,
      ]}
      resizeMode="contain"
      source={
        checked
          ? checkedImage ?? Images.ic_check
          : uncheckedImage ?? Images.ic_uncheck
      }>
      {children}
    </ImageButton>
  );
};

export default React.memo(CheckBox);

const styles = StyleSheet.create({
  imageStyle: {
    width: 20,
    height: 20,
  },
});
