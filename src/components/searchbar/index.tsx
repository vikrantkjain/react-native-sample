import _ from 'lodash';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LIGHT_GRAY_BORDER, WHITE, FontFamily, Images} from '@constants';
import {MatrixConstant, SearchBarProps} from '@customTypes';
import {Input} from '@components';

const Searchbar: React.FC<SearchBarProps> = props => {
  const {
    placeholder,
    onChangeText,
    style,
    inputStyle,
    onPressRightIcon,
    value,
    containerStyle,
  } = props;
  const changeText = (e: string) => {
    onChangeText && onChangeText(e);
  };
  // const onChangeTextDelayed = (text: string) => {
  //   console.log('text : ', text);
  //   _.debounce(onChangeText, 2000);
  // };
  const onChangeTextDelayed = _.debounce(changeText, 500);
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Input
        style={[styles.input, style]}
        leftIconStyle={styles.search}
        leftIcon={Images.ic_search}
        onChangeText={onChangeTextDelayed}
        TextInputStyle={[styles.inputStyle, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={LIGHT_GRAY_BORDER}
        rightIcon={Images.ic_cross}
        rightImageStyle={styles.rightImageStyle}
        onPressRightIcon={onPressRightIcon}
        value={value}
        testID={'TEST-SEARCHBAR'}
      />
    </View>
  );
};

export default React.memo(Searchbar);

Searchbar.defaultProps = {
  placeholder: 'Search by name or username',
  onChangeText: () => {},
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 44,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderRadius: 10,
    borderColor: WHITE,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    width: MatrixConstant.SCREEN_WIDTH - 30,
    marginBottom: -10,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
  },
  search: {
    height: 22,
    width: 22,
  },
  inputStyle: {
    paddingHorizontal: 10,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 17,
    color: LIGHT_GRAY_BORDER,
  },
  rightImageStyle: {
    height: 18,
    width: 18,
    left: 10,
  },
});
