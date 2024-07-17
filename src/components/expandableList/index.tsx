import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  LayoutRectangle,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import {
  ALBASTAR_GRAY,
  BLACK,
  GRAY,
  FontSize,
  FontFamily,
  Images,
} from '@constants';
import {ExpandableListItem, ExpandableListProps} from '@customTypes';

type nativeEvent = {nativeEvent: {layout: LayoutRectangle}};
const ExpandableList: React.FC<ExpandableListProps> = ({
  data,
  minusImage,
  plusImage,
}) => {
  const [faqArray, setFaqArray] = useState<Array<ExpandableListItem>>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [minHeight, setMinHeight] = useState<number>(0);
  const animation = new Animated.Value(55);

  useEffect(() => {
    if (data) {
      setFaqArray(data);
    }
  }, [data]);

  // {==============functions============}
  const _setMaxHeight = (event: nativeEvent) => {
    setMaxHeight(event.nativeEvent.layout.height);
  };

  const _setMinHeight = (event: nativeEvent) => {
    setMinHeight(event.nativeEvent.layout.height);
  };

  const toggle = (item: ExpandableListItem) => {
    //Step 1
    let initialValue = expanded ? maxHeight + minHeight : minHeight,
      finalValue = expanded ? minHeight : maxHeight + minHeight;

    let array = faqArray;
    for (const element of array) {
      if (element.id === item.id) {
        element.isSelected = !element.isSelected;
      } else {
        element.isSelected = false;
      }
      setFaqArray(array);
    }
    setExpanded(!expanded);
    animation.setValue(initialValue);
    Animated.spring(
      //Step 4
      animation,
      {
        toValue: finalValue,
        useNativeDriver: false,
      },
    ).start();
  };

  /**=============== Main Ui===================== */
  return (
    <View style={styles.mainView}>
      {faqArray.map(item => {
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.container,
              {
                // height: animation != NaN ? animation : 50,
              },
            ]}>
            <Pressable
              onPress={() => toggle(item)}
              style={[styles.titleContainer]}
              onLayout={_setMinHeight}>
              <View style={styles.titles}>
                <Text style={styles.titleText}>{item.question}</Text>
              </View>
              <View style={styles.commonFlex}>
                <View style={styles.button}>
                  {item.isSelected ? (
                    <Image
                      resizeMode="contain"
                      style={styles.buttonImage}
                      source={minusImage ? minusImage : Images.ic_minus}
                    />
                  ) : (
                    <Image
                      resizeMode="contain"
                      style={styles.rightButtonImage}
                      source={plusImage ? plusImage : Images.ic_plus}
                    />
                  )}
                </View>
              </View>
            </Pressable>
            {item.isSelected ? (
              <View style={styles.body} onLayout={_setMaxHeight}>
                <Text style={styles.textDescription}>{item.answer}</Text>
              </View>
            ) : null}
            {expanded ? <View style={styles.extendStyle} /> : <View />}
          </Animated.View>
        );
      })}
    </View>
  );
};

export default React.memo(ExpandableList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: ALBASTAR_GRAY,
    elevation: 4,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  extendStyle: {
    borderRadius: 1,
    borderWidth: 0.1,
    borderStyle: 'dashed',
    overflow: 'hidden',
    borderColor: ALBASTAR_GRAY,
  },
  mainView: {
    width: '100%',
    // paddingLeft: 15,
    // paddingRight: 15,
  },
  titles: {
    paddingLeft: 15,
    flex: 8,
  },
  commonFlex: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  button: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    padding: 3,
  },
  buttonImage: {
    width: 15,
    height: 15,
  },
  rightButtonImage: {
    width: 15,
    height: 15,
  },
  body: {
    paddingHorizontal: 15,
    backgroundColor: ALBASTAR_GRAY,
    marginBottom: 10,
  },
  titleText: {
    fontSize: FontSize.h6,
    color: BLACK,
    fontFamily: FontFamily.semiBold,
  },
  textDescription: {
    color: GRAY,
    fontSize: FontSize.t1,
    lineHeight: 22,
    fontFamily: FontFamily.regular,
  },
});
