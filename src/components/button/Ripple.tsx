/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {PureComponent} from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  I18nManager,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  Animation,
  EndCallback,
  RippleProps,
  RippleStateType,
  ripple,
} from '@customTypes';
class Ripple extends PureComponent<RippleProps, RippleStateType> {
  static defaultProps = {
    ...Pressable,
    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.3,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    rippleFades: true,
    disabled: false,
    onRippleAnimation: (animation: Animation, callback: EndCallback | null) =>
      animation.start(callback),
  };
  unique;
  mounted;
  constructor(props: RippleProps) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);

    this.renderRipple = this.renderRipple.bind(this);

    this.unique = 0;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout(event: LayoutChangeEvent) {
    let {width, height} = event.nativeEvent.layout;
    let {onLayout} = this.props;

    if (typeof onLayout === 'function') {
      onLayout(event);
    }

    this.setState({width, height});
  }

  onPress(event: GestureResponderEvent) {
    let {onPress, rippleSequential} = this.props;

    if (!rippleSequential || !this.state.ripples.length) {
      if (typeof onPress === 'function') {
        requestAnimationFrame(() => onPress && onPress(event));
      }

      this.startRipple(event);
    }
  }

  onLongPress(event: GestureResponderEvent) {
    let {onLongPress} = this.props;

    if (typeof onLongPress === 'function') {
      requestAnimationFrame(() => {
        if (onLongPress) {
          onLongPress(event);
        }
      });
    }
    this.startRipple(event);
  }

  onPressIn(event: GestureResponderEvent) {
    let {onPressIn} = this.props;

    if (typeof onPressIn === 'function') {
      onPressIn(event);
    }
  }

  onPressOut(event: GestureResponderEvent) {
    let {onPressOut} = this.props;

    if (typeof onPressOut === 'function') {
      onPressOut(event);
    }
  }

  onAnimationEnd() {
    if (this.mounted) {
      this.setState(({ripples}) => ({ripples: ripples.slice(1)}));
    }
  }

  startRipple(event: GestureResponderEvent) {
    let {width, height} = this.state;
    let {rippleDuration, rippleCentered, rippleSize, onRippleAnimation} =
      this.props;

    let w2 = 0.5 * width;
    let h2 = 0.5 * height;

    let {locationX, locationY} = rippleCentered
      ? {locationX: w2, locationY: h2}
      : event.nativeEvent;

    let offsetX = Math.abs(w2 - locationX);
    let offsetY = Math.abs(h2 - locationY);

    let R =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    let ripple = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    let animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });

    onRippleAnimation && onRippleAnimation(animation, this.onAnimationEnd);

    this.setState(({ripples}) => ({ripples: ripples.concat(ripple)}));
  }

  renderRipple({unique, progress, locationX, locationY, R}: ripple) {
    let {rippleColor, rippleOpacity, rippleFades} = this.props;

    let rippleStyle = {
      top: locationY - radius,
      [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
      backgroundColor: rippleColor,

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],

      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0],
          })
        : rippleOpacity,
    };

    return <Animated.View style={[Styles.ripple, rippleStyle]} key={unique} />;
  }

  render() {
    let {ripples} = this.state;
    let {
      // delayLongPress,
      // delayPressIn,
      // delayPressOut,
      disabled,
      children,
      rippleContainerBorderRadius,
      onPress,
      onLongPress,
      onLayout,
      onRippleAnimation,
      rippleColor,
      rippleOpacity,
      rippleDuration,
      rippleSize,
      rippleCentered,
      rippleSequential,
      rippleFades,
      ...props
    } = this.props;

    let touchableProps = {
      disabled,
      onLayout: this.onLayout,
      onPress: this.onPress,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      onLongPress: onLongPress ? this.onLongPress : undefined,
      rippleColor,
      rippleOpacity,
      rippleDuration,
      rippleSize,
      rippleContainerBorderRadius,
      rippleCentered,
      rippleSequential,
      rippleFades,
      children,
    };

    let containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <Pressable {...touchableProps}>
        <Animated.View {...props} pointerEvents="box-only">
          {children}
          <View style={[Styles.container, containerStyle]}>
            {ripples.map(this.renderRipple)}
          </View>
        </Animated.View>
      </Pressable>
    );
  }
}

export default Ripple;

const radius = 10;

const Styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
});
