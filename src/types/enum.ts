import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export enum KeyboardTypes {
  NEXT = 'next',
  DONE = 'done',
  NONE = 'none',
  EMAIL = 'email-address',
  PHONE = 'phone-pad',
  NUMBER = 'number-pad',
  DECIMAL = 'decimal-pad',
  NUMERIC = 'numeric',
  DEFAULT = 'default',
}

export enum MatrixConstant {
  SCREEN_WIDTH = width,
  SCREEN_HEIGHT = height,
  BASE_MARGIN = width / 30,
  DOUBLE_BASE_MARGIN = width / 15,
  SMALL_MARGIN = width / 60,
  BASE_PADDING = width / 30,
  DOUBLE_BASE_PADDING = width / 15,
  SMALL_PADDING = width / 60,
  baseCurvePadding = 27,
  orderBaseCurvePadding = 40,
  BUTTON_HEIGHT = 50,
  INPUT_HEIGHT = 50,
  buttonBorderRadius = 6,
  paddingTop = Platform.OS === 'ios'
    ? width === 896
      ? 44
      : height === 812
      ? 40
      : 20
    : 0,
  HEADER_HEIGHT = Platform.OS === 'ios'
    ? Dimensions.get('window').height === 896
      ? 88
      : 64
    : 56,
  paddingBottom = Platform.OS === 'ios' ? 0 : 25,
}
