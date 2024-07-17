import {StyleSheet} from 'react-native';
import {
  LIGHT_GRAY_BORDER,
  FontSize,
  MAIN_COLOR,
  FontFamily,
  GHOST_WHITE,
  PLATINUM,
  BLACK,
} from '@constants';
import {MatrixConstant} from '@customTypes';

const commonStyles = StyleSheet.create({
  inputCotainer: {
    marginTop: 8,
    borderRadius: 5,
    width: MatrixConstant.SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
  },
});

export const containerStyle = StyleSheet.create({
  default: {
    ...commonStyles.inputCotainer,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY_BORDER,
  },
  bordered: {
    ...commonStyles.inputCotainer,
    backgroundColor: GHOST_WHITE,
    borderWidth: 1,
    borderColor: PLATINUM,
  },
  activeBordered: {},
  errorBordered: {},
});

const Styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: FontSize.t2,
    minHeight: 23,
  },
  label: {
    textAlign: 'left',
    color: MAIN_COLOR,
    fontSize: FontSize.t1,
    fontFamily: FontFamily.medium,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 45,
    fontSize: FontSize.t1,
    fontFamily: FontFamily.medium,
    color: BLACK,
  },
  placeHolderText: {
    textAlign: 'left',
    color: 'rgba(2,5,49,.47)',
    fontSize: 14,
  },
  inputTextFieldView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  commonMargin: {
    marginHorizontal: 15,
  },
  redStar: {
    color: 'red',
  },
  errorPlaceholderStyle: {
    marginStart: 5,
    color: 'red',
    fontSize: 12,
  },
  inputErrorContainerStyle: {
    borderColor: 'red',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 0,
    borderBottomStartRadius: 0,
    borderTopStartRadius: 0,
    paddingHorizontal: 10,
  },
  rightViewStyle: {
    width: 30,
    paddingRight: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
  },
  rightImageStyle: {
    width: 30,
    height: 30,
  },
  iconViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.16,
  },
});

export default Styles;
