import React, {useEffect, useRef} from 'react';
import {Animated, Platform, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ShimmerProps} from '@customTypes';

/**
 * ShimmerPlaceHolder component.
 */
const ShimmerPlaceHolder: React.FC<ShimmerProps> = ({
  width,
  reverse,
  height,
  colorShimmer,
  style,
  widthShimmer,
  children,
  visible,
  backgroundColorBehindBorder,
  hasBorder,
  location,
  delay,
  duration,
  isInteraction,
  autoRun,
}) => {
  const beginShimmerPosition = useRef(new Animated.Value(-1)).current;
  // let animationValue: Animated.CompositeAnimation | undefined;
  const storeValueRef = useRef<Animated.CompositeAnimation>();

  useEffect(() => {
    const getAnimated = (): Animated.CompositeAnimation => {
      return Animated.loop(
        Animated.timing(beginShimmerPosition, {
          toValue: 1,
          delay: delay,
          duration: duration,
          useNativeDriver: true,
          isInteraction: isInteraction,
        }),
      );
    };
    // animationValue = getAnimated();
    storeValueRef.current = getAnimated();
    if (autoRun) {
      loopAnimated();
    }
    return () => {
      // animationValue?.stop();
      storeValueRef.current?.stop();
    };
  }, [autoRun, beginShimmerPosition, delay, duration, isInteraction]); //before it is an empty array []

  useEffect(() => {
    // animationValue?.start();
    storeValueRef.current?.start();
  }, [visible, storeValueRef]);
  // }, [visible, animationValue]);

  const loopAnimated = () => {
    // animationValue?.start();
    storeValueRef.current?.start();
  };

  let outputRange = [-width, width];
  if (reverse) {
    outputRange = outputRange.reverse();
  }
  const linearTranslate = beginShimmerPosition.interpolate({
    inputRange: [-1, 1],
    outputRange: outputRange,
  });

  return (
    <View style={!visible ? [{height, width}, styles.container, style] : []}>
      {!visible ? (
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: (colorShimmer && colorShimmer[0]) ?? '#ebebeb',
            },
          ]}>
          <Animated.View
            style={[
              styles.mainContainer,
              {transform: [{translateX: linearTranslate}]},
            ]}>
            <LinearGradient
              colors={colorShimmer ?? []}
              style={[styles.mainContainer, {width: width * widthShimmer}]}
              start={{
                x: -1,
                y: 0.5,
              }}
              end={{
                x: 2,
                y: 0.5,
              }}
              locations={location}
            />
          </Animated.View>
          <View style={styles.childrenStyle}>{children}</View>
          {(style || hasBorder) && Platform.OS === 'android' ? (
            <View
              style={[
                styles.childrenContainer,
                {
                  borderRadius: width / 2 + 40 / 2,
                  borderColor: backgroundColorBehindBorder,
                },
                style,
              ]}
            />
          ) : null}
        </View>
      ) : (
        children
      )}
    </View>
  );
};

export default React.memo(ShimmerPlaceHolder);

ShimmerPlaceHolder.defaultProps = {
  width: 200,
  height: 15,
  widthShimmer: 1,
  duration: 1000,
  delay: 0,
  colorShimmer: ['#ebebeb', '#c5c5c5', '#ebebeb'],
  reverse: false,
  autoRun: false,
  visible: false,
  backgroundColorBehindBorder: 'white',
  hasBorder: false,
  location: [0.3, 0.5, 0.7],
  isInteraction: true,
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  childrenStyle: {width: 0, height: 0},
  childrenContainer: {
    position: 'absolute',
    top: -40,
    bottom: -40,
    right: -40,
    left: -40,
    borderWidth: 40,
  },
  mainContainer: {
    flex: 1,
  },
});
