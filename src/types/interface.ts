import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ForwardedRef} from 'react';
import {Source} from 'react-native-fast-image';
import {
  Image,
  ImageOrVideo,
  Options,
  Video,
} from 'react-native-image-crop-picker';
import {
  Animated,
  ImageRequireSource,
  ImageSourcePropType,
  StyleProp,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native/types';

export type GlobalRoutes = {
  route: RouteProp<ParamListBase, string>;
  navigation?: StackNavigationProp<{}, never>;
};
export type ForgotPasswordRouteType = {
  test: number;
};
export interface TabBarIconsTypes {
  route: RouteProp<ParamListBase, string>;
  focused: boolean;
}
export type AddOptional<Type> = {
  [Property in keyof Type]?: Type[Property];
};
export interface UserInfoValidationTypes {
  nameError?: string;
  lastNameError?: string;
  numberError?: string;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
}
export type EndResult = {finished: boolean};
export type EndCallback = (result: EndResult) => void;
export type Animation = {
  start(
    onEnd: EndCallback | null,
    fromValue?: number,
    onUpdate?: (value: number) => void,
    previousAnimation?: Animation | null,
    animatedValue?: Animated.Value,
  ): void;
  stop(): void;
};
export type ripple = {
  unique: number;
  progress: Animated.Value;
  locationX: number;
  locationY: number;
  R: number;
};
export type RippleStateType = {
  width: number;
  height: number;
  ripples: ripple[];
};
export interface CountryItemsProps {
  abbreviation: string;
  phone_code: string;
  flag: string;
  country_name: string;
  id: number;
}
export interface CountryComponentItem {
  item: CountryItemsProps;
  phoneCode: string;
  countryName: string;
  flag: string;
  withFlag: boolean;
  ListItemOnPress: (item: CountryItemsProps) => void;
  listItemStyle: StyleProp<ViewStyle>;
  listTextStyle: StyleProp<TextStyle>;
}
export type forwardRefType = ForwardedRef<TextInput>;
export type IntroSliderType = {id: number; name: string};
export type closeToast = (duration?: number) => void;
export type showToast = (
  text: string,
  duration?: number,
  callback?: () => void,
  onPress?: () => void,
) => void;
export type MediaPickerProps = {
  singlePhoto: () => Promise<Image | string>;
  multiplePhotos: () => Promise<Image[] | string>;
  singleVideo: () => Promise<Video | string>;
  multipleVideos: () => Promise<Video[] | string>;
  allMedia: () => Promise<Image[] | Video[] | string>;
  customPicker: (
    value: Options,
  ) => Promise<Image[] | Video[] | Image | Video | string>;
  openModal: () => void;
  closeModal: () => void;
};
export type EventListenerData =
  | string
  | {[key: string]: any}
  | Array<{[key: string]: any}>
  | number
  | undefined;

export type OtpInputRefType = {
  clear: () => void;
  setValue: (value: string) => void;
};
export interface SwitchState {
  value: boolean;
  transformSwitch: Animated.Value;
  backgroundColor: Animated.Value;
  circleColor: Animated.Value;
  circleBorderColor: Animated.Value;
}
export type contextUserData = {
  name?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  token?: string;
  profileImage?: string;
};
export type updateUserDetails = (data: {[key: string]: string}) => void | null;
export interface ThemeProp {
  primary: string;
  primaryContainer: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  tertiary: string;
  onTertiary: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  background: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  error: string;
}
export type pickerReturnType = Promise<ImageOrVideo | string>;
export interface CompositeAnimation {
  start: (callback?: EndCallback) => void;
  stop: () => void;
  reset: () => void;
}
export type ToastRefType = {
  show: (value: string) => void;
  close: () => void;
};
export type ImageFI_type = Source | ImageRequireSource;
export type ImageRN_type = ImageSourcePropType;
