import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AZURE_BLUE, Images} from '@constants';
import {AddOptional, HeaderProps, MatrixConstant} from '@customTypes';
import {Image} from '@components';
import {SafeAreaView} from 'react-native-safe-area-context';

const DefaultHitSlop = {top: 10, bottom: 10, left: 10, right: 10};

/**
 * Header component.
 */
const Header: React.FC<AddOptional<HeaderProps>> = ({
  type = 'default',
  leftImage = type === 'home' ? Images.ic_menu : Images.ic_back_black,
  onPressLeft,
  title,
  titleStyle,
  style,
  hitSlop = DefaultHitSlop,
  leftImageStyle,
}) => {
  const renderHeader = () => {
    switch (type) {
      case 'home':
        return (
          <View style={[styles.homeView, style]}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.verticalCenter}
              onPress={onPressLeft}
              hitSlop={hitSlop}>
              <Image
                style={[styles.menuIcon, leftImageStyle]}
                source={leftImage}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={[styles.titleText, titleStyle]}>
              {title}
            </Text>
            <View style={styles.menuIcon} />
          </View>
        );

      case 'back':
        return (
          <View style={styles.rowAlign}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.defaultTouchBack}
              onPress={onPressLeft}
              hitSlop={hitSlop}>
              <Image
                style={[styles.backIcon, leftImageStyle]}
                source={leftImage}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={[styles.titleText, titleStyle]}>
              {title}
            </Text>
          </View>
        );

      default:
        return (
          <View style={styles.defaultView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.defaultTouchBackWithTopPadding}
              onPress={onPressLeft}
              hitSlop={hitSlop}>
              <Image
                style={[styles.backIcon, leftImageStyle]}
                source={leftImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <>
      <SafeAreaView
        edges={['top']}
        style={{flex: 0, backgroundColor: '#fff'}}
      />
      <View style={styles.toolbarCont}>{renderHeader()}</View>
    </>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  verticalCenter: {
    justifyContent: 'center',
  },
  defaultTouchBack: {
    paddingLeft: 20,
  },
  defaultTouchBackWithTopPadding: {
    paddingLeft: 20,
    paddingTop: 25,
  },
  menuIcon: {
    width: 10,
    height: 17,
    padding: 10,
    tintColor: AZURE_BLUE,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 2,
    backgroundColor: '#FFF',
    padding: 10,
  },
  backIcon: {
    width: 25,
    height: 15,
    tintColor: AZURE_BLUE,
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 20,
    marginLeft: 16,
  },
  toolbarCont: {
    height: MatrixConstant.HEADER_HEIGHT,
    backgroundColor: 'transparent',
  },
  defaultView: {
    height: MatrixConstant.HEADER_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
});
