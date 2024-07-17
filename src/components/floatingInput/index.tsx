import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BLACK,
  BLUE,
  DIM_GRAY,
  DOVE_GRAY,
  LIGHT_GRAY_BORDER,
  FontSize,
  Images,
} from '@constants';
import {Image} from '@components';
import {FloatingInputProps, forwardRefType} from '@customTypes';

/**
 * FloatingInput component.
 */
const FloatingInput = forwardRef(
  (props: FloatingInputProps, ref: forwardRefType) => {
    const {
      label,
      value,
      placeholder,
      secureTextEntry,
      blurOnSubmit,
      style,
      containerStyle,
      errorTextStyle,
      error,
      countryCode,
      onChangeText,
      labelStyle,
      togglePassword,
      editable,
      maxLength,
    } = props;
    const [isFocused, setFocused] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const _animatedIsFocused = useRef(
      new Animated.Value(value === '' ? 0 : 1),
    ).current;

    const handleFocus = () => {
      setFocused(true);
    };
    const handleBlur = () => {
      setFocused(false);
    };

    const handleActive = () => {
      setActive(!active);
      setTimeout(() => {
        togglePassword && togglePassword(active);
      }, 10);
    };

    useEffect(() => {
      Animated.timing(_animatedIsFocused, {
        toValue: isFocused || value !== '' ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [value, isFocused, _animatedIsFocused]);

    const labelStyles1 = StyleSheet.create({
      one: {
        position: 'absolute',
        left: 3,
        top: _animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
        fontSize: _animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 12],
        }),
        color: _animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [DIM_GRAY, DOVE_GRAY],
        }),
        fontWeight: 'normal',
      },
    });
    const labelStyles2 = StyleSheet.create({
      two: {
        position: 'absolute',
        left: 3,
        top: _animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
        fontSize: _animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 12],
        }),
        color: _animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [DOVE_GRAY, BLUE],
        }),
        fontWeight: 'normal',
      },
    });

    return (
      <View style={[styles.topView, style]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            labelStyle,
            countryCode === true ? labelStyles2.two : labelStyles1.one,
          ]}>
          {label}
        </Animated.Text>
        <View style={[styles.mainView, containerStyle]}>
          <View style={{flex: togglePassword ? 0.9 : 1}}>
            <TextInput
              testID="Floating-input"
              editable={editable}
              value={value}
              style={[styles.textInputStyle]}
              ref={ref}
              maxLength={maxLength}
              onChangeText={onChangeText}
              placeholder={placeholder}
              onFocus={handleFocus}
              onBlur={handleBlur}
              secureTextEntry={secureTextEntry}
              blurOnSubmit={blurOnSubmit}
            />
          </View>
          {togglePassword && (
            <TouchableOpacity
              style={[styles.iconViewStyle]}
              onPress={handleActive}>
              <Image
                source={active ? Images.ic_eye_visible : Images.ic_eye_hidden}
                style={styles.iconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          {/* {isRightButton ? (
              <Button
                disabled={false}
                onPress={() => {
                  this.props.verifyNumber();
                }}
                buttonText={Strings.verifyButton}
                buttonTextStyle={{fontSize: 11, alignSelf: 'center'}}
                buttonStyle={{height: 25}}
                //buttonStyle={styles.buttonStyle}
              />
            ) : null} */}
        </View>
        <Text style={[styles.errorText, errorTextStyle]}>{error ?? ''}</Text>
      </View>
    );
  },
);

export default React.memo(FloatingInput);

const styles = StyleSheet.create({
  topView: {
    paddingTop: 18,
    marginTop: 10,
  },
  textInputStyle: {
    paddingVertical: 2,
    fontSize: 14,
    color: BLACK,
  },
  mainView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY_BORDER,
  },
  iconViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  iconRightStyle: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    fontSize: FontSize.t2,
    minHeight: 23,
  },
});
