import React, {useState, memo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  clamp,
  interpolateColor,
} from 'react-native-reanimated';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {ToggleSwitchProps} from '@customTypes';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  initial = false,
  backgroundTrack,
  width = 50,
  height = 22.5,
  onValueChange = () => {},
  innerCircleTrack,
}) => {
  const borderRadius = height / 2;
  const [toggle, setToggle] = useState(initial);
  const translate = useSharedValue(initial ? width - height : 0);

  /**
   * @animated style
   */
  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(translate.value)}],
      backgroundColor: interpolateColor(
        translate.value,
        [0, width - height],
        [innerCircleTrack.off, innerCircleTrack.on],
      ),
    };
  });
  const animBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translate.value,
        [0, width - height],
        [backgroundTrack.off, backgroundTrack.on],
      ),
    };
  });

  /**
   * @gesture detect
   */
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => {
      setToggle(!toggle);
      onValueChange && onValueChange(!toggle);
      translate.value = toggle ? 0 : width - height;
    });

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(e => {
      const maxMinValue = clamp(e.translationX, 0, width - height);
      translate.value = maxMinValue;
    })
    .onEnd(() => {
      setToggle(!toggle);
      onValueChange && onValueChange(!toggle);
      translate.value = toggle ? 0 : width - height;
    });

  /**
   * @combine gesture
   */
  const composed = Gesture.Exclusive(tap, panGesture);

  /**
   * @main UI
   */
  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        testID={'TEST_VIEW'}
        style={[
          styles.container,
          {width, height, borderRadius},
          animBackground,
        ]}>
        <Animated.View
          style={[
            styles.innerCircle,
            {
              height,
              width: height,
              borderRadius,
            },
            animStyle,
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default memo(ToggleSwitch);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  innerCircle: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 1,
  },
});
