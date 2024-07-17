import React from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE} from '@constants/Colors';
import {MatrixConstant, ButtonProps} from '@customTypes';
import {Strings} from '@constants/Strings';
import {Image, Ripple} from '@components';

/**
 * Button component.
 */
const Button: React.FC<ButtonProps> = ({
  title,
  opacity = 0.5,
  onPress,
  style,
  buttonTextStyle,
  disabled = false,
  loading,
  loadingText,
  showLeftImage,
  imageStyleLeft,
  leftImage,
  showRightImage,
  imageStyleRight,
  rightImage,
  indicatorColor,
  indicatorSize,
  indicatorStyle,
  type,
}) => {
  return (
    <Animated.View>
      <Ripple
        disabled={disabled}
        rippleSize={400}
        rippleFades={true}
        rippleColor={'#020531'}
        rippleDuration={500}
        rippleOpacity={opacity}
        onPress={onPress}
        testID="BUTTON-TEST01"
        style={[styles[type ?? 'large'], style]}>
        {loading ? (
          <View style={styles.loadingView}>
            <Text
              numberOfLines={1}
              allowFontScaling={false}
              style={[styles.buttonTextStyle, buttonTextStyle]}>
              {loadingText}
            </Text>
            <ActivityIndicator
              style={[styles.indicatorView, indicatorStyle]}
              size={indicatorSize}
              color={indicatorColor}
            />
          </View>
        ) : (
          <View style={styles.imgTxtView}>
            {showLeftImage && leftImage ? (
              <Image
                style={[styles.imageStyleLeft, imageStyleLeft]}
                resizeMode="contain"
                source={leftImage}
              />
            ) : null}
            <Text style={[styles.buttonTextStyle, buttonTextStyle]}>
              {title}
            </Text>
            {showRightImage && rightImage ? (
              <Image
                style={[styles.imageStyleRight, imageStyleRight]}
                resizeMode="contain"
                source={rightImage}
              />
            ) : null}
          </View>
        )}
      </Ripple>
    </Animated.View>
  );
};

export default React.memo(Button);

Button.defaultProps = {
  title: 'Click me',
  loadingText: Strings.pleaseWait,
  opacity: 0.5,
  indicatorColor: '#000',
  indicatorSize: 'small',
  type: 'large',
  disabled: false,
};

const commonStyles = StyleSheet.create({
  button: {
    backgroundColor: BLUE,
    width: MatrixConstant.SCREEN_WIDTH * 0.85,
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 5,
  },
});

const styles = StyleSheet.create({
  large: {
    ...commonStyles.button,
    width: MatrixConstant.SCREEN_WIDTH * 0.85,
  },
  medium: {
    ...commonStyles.button,
    width: MatrixConstant.SCREEN_WIDTH * 0.55,
  },
  small: {
    ...commonStyles.button,
    width: MatrixConstant.SCREEN_WIDTH * 0.35,
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: '#FFF',
  },
  imageStyleLeft: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  imageStyleRight: {
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  pleaseWaitText: {
    color: '#000',
    fontSize: 14,
  },
  indicatorView: {
    height: 10,
    width: 10,
    marginLeft: 15,
  },
  imgTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
