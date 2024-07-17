import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {CompositeAnimation, EasyToastProps, ToastRefType} from '@customTypes';
export const DURATION = {
  LENGTH_SHORT: 500,
  FOREVER: 0,
};
const {height} = Dimensions.get('window');
let duration_: number | undefined;
let callback_: (() => void) | undefined;
let animation: CompositeAnimation | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let isShow = false;
let pos: number | undefined;
const useNativeAnimation = false;
type State = {
  isShow?: boolean;
  text?: string;
  opacityValue: Animated.Value;
};

const EasyToastFnComp = forwardRef(
  (props: EasyToastProps, ref: React.ForwardedRef<ToastRefType>) => {
    const {
      buttonStyle,
      buttonText,
      buttonTextStyle,
      defaultCloseDelay,
      fadeInDuration = 500,
      fadeOutDuration = 500,
      onPress,
      opacity = 1,
      position = 'bottom',
      positionValue = 120,
      style,
      textStyle = {color: 'white'},
    } = props;
    useEffect(() => {
      switch (position) {
        case 'top':
          pos = positionValue;
          break;
        case 'center':
          pos = height / 2;
          break;
        case 'bottom':
          pos = height - (positionValue ?? 0);
          break;
      }
      return () => {
        animation && animation.stop();
        timer && clearTimeout(timer);
      };
    }, []);

    const [state, setState] = useState<State>({
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(opacity ?? 1),
    });
    useImperativeHandle(ref, () => ({
      show: (text: string, duration?: number, callback?: () => void) => {
        onShow(text, duration, callback);
      },
      close: (duration?: number) => {
        onClose(duration);
      },
    }));

    const onShow = (text: string, duration?: number, callback?: () => void) => {
      duration_ =
        typeof duration === 'number' ? duration_ : DURATION.LENGTH_SHORT;
      callback_ = callback;
      setState({
        ...state,
        isShow: true,
        text: text,
      });

      animation = Animated.timing(state.opacityValue, {
        toValue: opacity ?? 1,
        duration: fadeInDuration,
        useNativeDriver: false,
      });
      animation.start(() => {
        isShow = true;
        if (duration !== DURATION.FOREVER) {
          onClose();
        }
      });
    };

    const onClose = (duration?: number) => {
      let delay = typeof duration === 'undefined' ? duration_ : duration;
      if (delay === DURATION.FOREVER) {
        delay = defaultCloseDelay || 250;
      }
      if (!isShow && !state.isShow) {
        return;
      }
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        animation = Animated.timing(state.opacityValue, {
          toValue: 0.0,
          duration: fadeOutDuration,
          useNativeDriver: false,
        });
        animation.start(() => {
          setState({
            ...state,
            isShow: false,
          });
          isShow = false;
          if (typeof callback_ === 'function') {
            callback_();
          }
        });
      }, delay);
    };
    const view = state.isShow ? (
      <View style={[styles.container, {top: pos}]} pointerEvents="auto">
        <Animated.View
          style={[styles.content, {opacity: state.opacityValue}, style]}>
          <Text style={textStyle}>{state.text}</Text>
          {buttonText && (
            <TouchableWithoutFeedback style={[buttonStyle]} onPress={onPress}>
              <Text style={[styles.text, buttonTextStyle]}>{buttonText}</Text>
            </TouchableWithoutFeedback>
          )}
        </Animated.View>
      </View>
    ) : (
      <View />
    );
    return view;
  },
);

export default React.memo(EasyToastFnComp);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
