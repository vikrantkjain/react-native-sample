import {FastImageProps, ImageStyle, Source} from 'react-native-fast-image';
import {
  ActivityIndicatorProps,
  GestureResponderEvent,
  Insets,
  LayoutChangeEvent,
  PressableProps,
  ReturnKeyType,
  ReturnKeyTypeAndroid,
  ReturnKeyTypeIOS,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewProps,
  ViewStyle,
  Animated,
  ModalProps,
  ImageRequireSource,
  ColorValue,
  TextInput,
  ImageSourcePropType,
} from 'react-native/types';
import {Image, ImageOrVideo, Video} from 'react-native-image-crop-picker';
import {PhotoFile} from 'react-native-vision-camera';
import {
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import {ReactElement, ReactNode} from 'react';
import {LinearGradientProps} from 'react-native-linear-gradient';
import {CountryComponentItem, EndCallback, IntroSliderType} from './interface';

export type ImageProps = FastImageProps;
export type ButtonType = 'large' | 'medium' | 'small';
export interface ButtonProps {
  title?: string;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  imageStyleLeft?: ImageProps['style'];
  imageStyleRight?: ImageProps['style'];
  rightImage?: ImageProps['source'];
  leftImage?: ImageProps['source'];
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  showLeftImage?: boolean;
  showRightImage?: boolean;
  onPress?: () => void;
  indicatorColor?: string;
  indicatorSize?: ActivityIndicatorProps['size'];
  indicatorStyle?: ActivityIndicatorProps['style'];
  type?: ButtonType;
  rippleContainerBorderRadius?: number;
}

export interface CameraProps {
  openCamera: boolean;
  cropping?: boolean;
  width?: number;
  height?: number;
  onCapture?: (value: Image | PhotoFile | undefined) => void;
  onBack?: () => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  leftImage?: ImageProps['source'];
  leftImageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  type?: 'default' | 'home' | 'back' | 'tab' | 'auth';
  hitSlop?: Insets;
}

export interface DatePickerProps {
  style?: StyleProp<ViewStyle>;
  mode?: AndroidNativeProps['mode'] | IOSNativeProps['mode'];
  androidMode?: AndroidNativeProps['display'];
  minuteInterval?: number;
  date?: string | Date;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  height?: number;
  duration?: number;
  confirmBtnText?: string;
  cancelBtnText?: string;
  iconSource?: ImageProps['source'];
  iconComponent?: ReactElement;
  customStyles?:
    | {
        btnCancel: object;
        btnTextCancel: object;
        btnConfirm: object;
        dateInput: object;
        disabled: object;
        dateIcon: object;
        placeholderText: object;
        dateText: object;
        datePicker: object;
        datePickerCon: object;
        btnTextConfirm: object;
        dateTouchBody: object;
      }
    | undefined;

  showIcon?: boolean;
  disabled?: boolean;
  allowFontScaling?: boolean;
  onDateChange?: (str: Date | string, str1?: string | Date) => void;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
  onPressMask?: () => void;
  placeholder?: string;
  modalOnResponderTerminationRequest?: () => boolean;
  is24Hour?: boolean;
  getDateStr?: (date: Date) => Date;
  locale?: string;
  timeZoneOffsetInMinutes?: number;
  TouchableComponent?: ReactNode;
  testID?: string;
  cancelBtnTestID?: string;
  confirmBtnTestID?: string;
  hideText?: boolean;
}

export type ExpandableListItem = {
  id: number | string;
  question: string;
  answer: string;
  isSelected?: boolean;
};

export interface ExpandableListProps {
  data?: ExpandableListItem[];
  plusImage?: ImageProps['source'];
  minusImage?: ImageProps['source'];
}
export interface ImageButtonProps {
  onPress?: () => void;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  source?: FastImageProps['source'];
  imageStyle?: FastImageProps['style'];
  type?: 'default' | 'background';
  imageProps?: Partial<FastImageProps>;
  imageBackgroundProps?: Partial<ImageProps>;
  resizeMode?: FastImageProps['resizeMode'];
  children?: ReactNode;
  hasRightChild?: boolean;
}
export type InputContainerStyle = 'bordered' | 'default';

export interface InputProps {
  errorTextStyle?: StyleProp<TextStyle>;
  error?: string | undefined | null;
  label?: string | null;
  placeholderTextColor?: string;
  placeholder?: TextInputProps['placeholder'];
  value?: TextInputProps['value'];
  selection?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  pointerEvents?: ViewProps['pointerEvents'];
  textAlignVertical?: TextInputProps['textAlignVertical'];
  returnKeyType?: ReturnKeyType | ReturnKeyTypeAndroid | ReturnKeyTypeIOS;
  keyboardType?: TextInputProps['keyboardType'];
  leftIcon?: ImageProps['source'];
  rightIcon?: ImageProps['source'];
  showPasswordIcon?: ImageProps['source'];
  hidePasswordIcon?: ImageProps['source'];
  enableRightView?: boolean;
  blurOnSubmit?: boolean;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  multiline?: boolean;
  isMandatory?: boolean;
  isSelection?: boolean;
  autoCorrect?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  inputStyle?: TextInputProps['style'];
  leftIconStyle?: FastImageProps['style'];
  style?: StyleProp<ViewStyle>;
  onTouchStart?: (value?: GestureResponderEvent) => void;
  onSubmitEditing?: () => void;
  onChangeText?: TextInputProps['onChangeText'];
  underlineColorAndroid?: TextInputProps['underlineColorAndroid'];
  type?: InputContainerStyle;
  labelStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  togglePassword?: (active: boolean) => void;
  textContentType?: TextInputProps['textContentType'];
  TextInputStyle?: StyleProp<TextStyle>;
  onFocus?: () => void;
  rightImageStyle?: FastImageProps['style'];
  onPressRightIcon?: () => void;
  testID?: string;
}

export interface SwitchProps {
  onValueChange: (bool?: boolean) => void;
  disabled: boolean;
  activeText: string;
  inActiveText: string;
  backgroundActive: string;
  backgroundInactive: string;
  value: boolean;
  circleActiveColor: string;
  circleInActiveColor: string;
  circleInactiveBorderColor: string;
  circleActiveBorderColor: string;
  circleSize: number;
  circleBorderActiveColor: string;
  circleBorderInactiveColor: string;
  activeTextStyle: StyleProp<TextStyle>;
  inactiveTextStyle: StyleProp<TextStyle>;
  containerStyle: StyleProp<ViewStyle>;
  barHeight: number;
  circleBorderWidth: number;
  innerCircleStyle: StyleProp<ViewStyle>;
  renderInsideCircle: JSX.Element;
  changeValueImmediately: boolean;
  outerCircleStyle: StyleProp<ViewStyle>;
  renderActiveText: boolean;
  renderInActiveText: boolean;
  switchLeftPx: number;
  switchRightPx: number;
  switchWidthMultiplier: number;
  switchBorderRadius: number;
}

export interface TextButtonProps {
  title?: string;
  RenderText?: React.FC<TextButtonProps | undefined> | null;
  onPress?: () => void;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
  testID?: string;
}
export interface TextComponentProps {
  children: ReactNode;
  title?: string;
  style?: StyleProp<TextStyle>;
}

export interface ShimmerProps {
  width: number;
  reverse?: boolean;
  height: number;
  colorShimmer?: string[];
  style?: StyleProp<ViewStyle>;
  widthShimmer: number;
  children?: React.ReactNode;
  visible?: boolean;
  backgroundColorBehindBorder?: string;
  hasBorder?: boolean;
  location?: LinearGradientProps['locations'];
  autoRun: boolean;
  delay?: number;
  duration?: number;
  isInteraction?: boolean;
}

export interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onPressRightIcon?: () => void;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  value?: string;
  inputStyle?: TextInputProps['style'];
}

export interface RoundShapeImageProps {
  onPress?: PressableProps['onPress'];
  imageUrl?: FastImageProps['source'];
  height: number;
  editIconSource?: FastImageProps['source'];
  editIcon?: boolean;
}

export interface MediaPickerCompProps {
  children?: JSX.Element;
  onSelectItem?: (
    item: ImageOrVideo | Image[] | Video[] | string,
    index?: number,
  ) => void;
  style?: StyleProp<ViewStyle>;
}

export interface RippleProps {
  disabled: boolean;
  onLayout?: (event?: LayoutChangeEvent) => void;
  onPress?: (event?: GestureResponderEvent) => void;
  onPressIn?: (event?: GestureResponderEvent) => void;
  onPressOut?: (event?: GestureResponderEvent) => void;
  onLongPress?: (event?: GestureResponderEvent) => void;
  rippleColor: string;
  rippleOpacity: number;
  rippleDuration?: number;
  rippleSize: number;
  rippleContainerBorderRadius?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleFades?: boolean;
  children: JSX.Element;
  onRippleAnimation?: (
    animation: Animated.CompositeAnimation,
    callback: EndCallback | null,
  ) => void;
  testID?: string;
  [key: string]: unknown;
}

export interface DialogProps {
  visible?: boolean;
  animationType?: ModalProps['animationType'];
  onRequestClose?: ModalProps['onRequestClose'];
  transparent?: ModalProps['transparent'];
  statusBarTranslucent?: ModalProps['statusBarTranslucent'];
  onShow?: ModalProps['onShow'];
  onDismiss?: ModalProps['onDismiss'];
  title?: string;
  okText?: string;
  cancelText?: string;
  okButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  okPress?: () => void;
  cancelPress?: () => void;
}
export interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

export interface FloatingInputProps {
  value?: string;
  togglePassword?: (active: boolean) => void;
  handleActives?: () => void;
  countryCode?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  isImage?: boolean;
  placeholder?: string;
  errorTextStyle?: StyleProp<TextStyle>;
  error?: string;
  isMandatory?: boolean;
  underlineColorAndroid?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  blurOnSubmit?: boolean;
  label?: string;
  keyboardType?: TextInputProps['keyboardType'];
  maxLength?: number;
  onChangeText: (value: string) => void;
  isRightButton?: boolean;
}

export interface CustomRatingProps {
  initialRating?: number;
  renderStars?: number;
  starHeight?: number;
  onResult?: (result: number) => void;
  spaceBetween?: number;
  filledImage?: ImageRequireSource;
  unfilledImage?: ImageRequireSource;
  isHalf?: boolean;
  swipeEnabled?: boolean;
}
export interface ToggleSwitchProps {
  initial?: boolean;
  backgroundTrack: {on: string; off: string};
  width?: number;
  height?: number;
  onValueChange?: (value: boolean) => void;
  innerCircleTrack: {on: string; off: string};
}

export interface ModalPickerProps {
  onSelectItem: (item: {name: string}, index: number) => void;
  itemContainerStyle: StyleProp<ViewProps>;
  dialogBoxStyle: StyleProp<ViewProps>;
  leftImage: boolean;
  selectedValue: string;
  title: string;
  data: Array<{name: string}>;
  isVisible: boolean;
  onClose: () => void;
}

export interface IntroSliderProps {
  data: Array<IntroSliderType>;
  renderItem: (item: IntroSliderType, index: number) => JSX.Element;
  style?: StyleProp<ViewStyle>;
  pagerViewStyle?: StyleProp<ViewStyle>;
  dotContainerStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotStyle?: StyleProp<ViewStyle>;
}
export interface PaginationProps extends IntroSliderProps {
  position: number;
}
export interface LoadingProps {
  isLoading?: boolean;
  loaderStyle?: StyleProp<ViewStyle>;
  color?: ColorValue | undefined;
  circleSize?: number;
}

export interface OTPTextViewProps {
  defaultValue?: string;
  inputCount: number;
  containerStyle?: StyleProp<ViewProps>;
  textInputStyle?: StyleProp<TextInputProps>;
  inputCellLength?: number;
  tintColor?: string;
  offTintColor?: string;
  handleTextChange?: (value: string) => void;
  inputType?: string;
  keyboardType?: TextInputProps['keyboardType'];
}
export interface EasyToastProps {
  style?: StyleProp<ViewStyle>;
  position?: 'top' | 'center' | 'bottom';
  textStyle?: StyleProp<TextStyle>;
  positionValue?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  opacity?: number;
  defaultCloseDelay?: number;
  onPress?: () => void;
  buttonText?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
}
export interface HeaderProps {
  onPressLeft: () => void;
  style: StyleProp<ViewStyle>;
  title: string;
  leftImage: FastImageProps['source'];
  leftImageStyle: FastImageProps['style'];
  titleStyle: StyleProp<TextStyle>;
  type: 'default' | 'home' | 'back';
  hitSlop: Insets;
}
export interface CountryPickerProps extends CountryComponentItem {
  disabled: boolean;
  hideCountryCode: boolean;
  dropDownImage: Source | ImageRequireSource;
  backImage: Source | ImageRequireSource;
  style: StyleProp<ViewStyle>;
  inputStyle: StyleProp<TextStyle>;
  countryNameTextStyle: StyleProp<TextStyle>;
  selectedCountryTextStyle: StyleProp<TextStyle>;
  countryCode: string;
  placeholder: string;
  showCountryName: boolean;
  selectedValue: (item: string, value: number) => void;
  containerStyle: StyleProp<ViewStyle>;
  headerStyle: StyleProp<ViewStyle>;
  listStyle: StyleProp<ViewStyle>;
  backImageStyle: FastImageProps['style'];
  inputProps: TextInput;
  animationType: 'none' | 'slide' | 'fade' | undefined;
}
export interface CheckBoxProps {
  children: JSX.Element;
  style: StyleProp<ViewStyle>;
  checkedImage?: ImageSourcePropType;
  uncheckedImage?: ImageSourcePropType;
  checkedImageStyle?: FastImageProps['style'];
  uncheckedImageStyle?: FastImageProps['style'];
}
