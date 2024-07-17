/**
 * Declare all the constant keys and their values here for using in throughout the app.
 */

import {Platform} from 'react-native';

export const LocalStorageKeys = {
  SHARED_PREFRENCE: 'DemoCode_pref',
  KEYCHAIN_SERVICE: 'DemoCode_service',
  ACCESS_TOKEN: 'access_token',
  DEVICE_TOKEN: 'device_token',
  USER_DATA: 'user_data',
  IS_INTRO_SHOW: 'is_intro_show',
  IS_KEYCHAIN_HAS_DATA: 'is_keychain_has_data',
};
export const ApiConstants = {
  APP_VERSION: '1.0.0',
  DEVICE_TYPE: Platform.OS,
  CERTIFICATE_TYPE: __DEV__ ? 'development' : 'distribution',
  GET: 'get',
  POST: 'post',
  POST_WITH_FORM: 'post_with_form',
  PUT: 'put',
  DELETE: 'delete',
  SERVER_DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
};
export const AppConstants = {
  IS_LOG: true,
  AUTH_TOOLBAR: 'AUTH_TOOLBAR',
  NETWORK_CHECK: false,
  DEVICE_TYPE: Platform.OS,
  APP_VERSION: '1.0.0',
  TOUCH_RADIUS: 20,
  TOUCH_OPACITY: 0.5,
  TOUCH_DURATION: 500,
  MALE: 'male',
  FEMALE: 'female',
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/,
  MOBILE_REGEX: /^[0][1-9]\d{9}$|^[1-9]\d{5,15}$/,
  NUMBER_OR_DECIMAL_REGEX: /^(\d*\.)?\d+$/,
  NUMBER_REGEX: /^\d+$/,
  CHARACTER_OR_NUMBER_REGEX: /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{4,7}$/,
  NAME_REGEX: /^[^\s].+[a-zA-Z]+[a-zA-Z]+$/,
  FULLNAME_REGEX: /^[a-zA-z]+([\s][a-zA-Z]+)*$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[a-z])(?=.*\d)\S{8,18}$/,
  PIN_CODE_REGEX: /^[1-9][0-9]{5}$/,
  ADDRESS_REGEX: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  DATE_FORMAT_APP: 'DD MMM,YYYY',
  TIME_FORMAT_APP: 'HH:MM A',
  SUBJECT_MAX_LENGTH: 100,
  MESSAGE_MAX_LENGTH: 1000,
  DEV: __DEV__,
};
export const StoreConstantValues = {
  USER_ACCESS_TOKEN: '',
  USER_INFO_DATA: '',
  USER_ID: '',
  AUTHORIZATION_DATA: '',
};
