import React, {useState} from 'react';
import {Animated, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import styles from './Style';
import {IntroSliderProps, PaginationProps, AddOptional} from '@customTypes';
const Pagination: React.FC<AddOptional<PaginationProps>> = ({
  position,
  data,
  dotContainerStyle,
  dotStyle,
  activeDotStyle,
}) => {
  return (
    <View style={[styles.pagination, dotContainerStyle]}>
      {data &&
        data.map((item, index) => {
          return (
            <View key={index} style={styles.paginationDotContainer}>
              <View
                style={
                  position === index
                    ? [styles.paginationDotActive, activeDotStyle]
                    : [styles.paginationDot, dotStyle]
                }
              />
            </View>
          );
        })}
    </View>
  );
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

/**
 * IntroSlider component.
 */
const IntroSlider: React.FC<IntroSliderProps> = props => {
  const [position, setPosition] = useState(1);
  const {
    data,
    renderItem,
    style,
    pagerViewStyle,
    dotStyle,
    dotContainerStyle,
    activeDotStyle,
  } = props;

  const myListener = ({nativeEvent}: PagerViewOnPageSelectedEvent) => {
    const {position} = nativeEvent;
    setPosition(position);
  };

  return (
    <View style={[styles.container, style]}>
      <AnimatedPagerView
        initialPage={0}
        style={[styles.pagerViewStyle, pagerViewStyle]}
        onPageSelected={myListener}>
        {data.map((item, index) => {
          return (
            <View key={index}>{renderItem && renderItem(item, index)}</View>
          );
        })}
      </AnimatedPagerView>
      <Pagination
        dotContainerStyle={dotContainerStyle}
        activeDotStyle={activeDotStyle}
        dotStyle={dotStyle}
        data={data}
        position={position}
      />
    </View>
  );
};

export default React.memo(IntroSlider);
