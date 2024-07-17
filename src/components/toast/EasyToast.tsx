import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  CompositeAnimation,
  EasyToastProps,
  closeToast,
  showToast,
} from '@customTypes';
export const DURATION = {
  LENGTH_SHORT: 500,
  FOREVER: 0,
};
const {height} = Dimensions.get('window');

const useNativeAnimation = false;

type State = {
  isShow: boolean;
  text: string;
  opacityValue: Animated.Value;
};

export default class EasyToast extends Component<EasyToastProps, State> {
  duration: number | undefined;
  callback: (() => void) | undefined;
  animation: CompositeAnimation | undefined;
  timer: ReturnType<typeof setTimeout> | undefined;
  isShow = false;
  constructor(props: EasyToastProps) {
    super(props);
    this.state = {
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(this.props.opacity ?? 1),
    };
  }

  static defaultProps = {
    position: 'bottom',
    textStyle: {color: 'white'},
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1,
    useNativeAnimation: false,
  };

  show: showToast = (text, duration, callback) => {
    this.duration =
      typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
    this.callback = callback;
    this.setState({
      isShow: true,
      text: text,
    });

    this.animation = Animated.timing(this.state.opacityValue, {
      toValue: this.props.opacity ?? 1,
      duration: this.props.fadeInDuration,
      useNativeDriver: useNativeAnimation,
    });
    this.animation.start(() => {
      this.isShow = true;
      if (duration !== DURATION.FOREVER) {
        this.close();
      }
    });
  };

  close: closeToast = duration => {
    let delay = typeof duration === 'undefined' ? this.duration : duration;

    if (delay === DURATION.FOREVER) {
      delay = this.props.defaultCloseDelay || 250;
    }

    if (!this.isShow && !this.state.isShow) {
      return;
    }
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.animation = Animated.timing(this.state.opacityValue, {
        toValue: 0.0,
        duration: this.props.fadeOutDuration,
        useNativeDriver: useNativeAnimation,
      });
      this.animation.start(() => {
        this.setState({
          isShow: false,
        });
        this.isShow = false;
        if (typeof this.callback === 'function') {
          this.callback();
        }
      });
    }, delay);
  };

  componentWillUnmount() {
    this.animation && this.animation.stop();
    this.timer && clearTimeout(this.timer);
  }

  render() {
    let pos;
    switch (this.props.position) {
      case 'top':
        pos = this.props.positionValue;
        break;
      case 'center':
        pos = height / 2;
        break;
      case 'bottom':
        pos = height - (this.props.positionValue ?? 0);
        break;
    }

    const {onPress, buttonText, buttonStyle, buttonTextStyle, style} =
      this.props;

    const view = this.state.isShow ? (
      <View style={[styles.container, {top: pos}]} pointerEvents="auto">
        <Animated.View
          style={[styles.content, {opacity: this.state.opacityValue}, style]}>
          <Text style={this.props.textStyle}>{this.state.text}</Text>
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
  }
}

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
