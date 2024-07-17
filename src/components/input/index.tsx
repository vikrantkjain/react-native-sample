import React, {forwardRef, useState} from 'react';
import {Text, TextInput, Pressable, View} from 'react-native';
import {TRANSPARENT, Images} from '@constants';
import {Image} from '@components';
import styles, {containerStyle} from './Styles';
import {InputProps, forwardRefType} from '@customTypes';

const Input = forwardRef((props: InputProps, ref: forwardRefType) => {
  const {
    placeholder,
    onChangeText,
    value,
    keyboardType,
    secureTextEntry,
    returnKeyType,
    isSelection,
    autoFocus,
    onSubmitEditing,
    TextInputStyle,
    editable,
    pointerEvents,
    isMandatory,
    maxLength,
    blurOnSubmit,
    autoCapitalize,
    onTouchStart,
    textAlignVertical,
    multiline,
    leftIconStyle,
    leftIcon,
    numberOfLines,
    style,
    label,
    labelStyle,
    labelTextStyle,
    togglePassword,
    errorTextStyle,
    error,
    onFocus,
    rightIcon,
    rightImageStyle,
    placeholderTextColor,
    onPressRightIcon,
    testID,
  } = props;
  const [active, setActive] = useState<boolean>(false);
  const [activeBorder, setActiveBorder] = useState<boolean>(false);
  // ===================={ON SUBMIT ACTION}=======================//
  const onSubmit = () => {
    if (onSubmitEditing !== undefined) {
      onSubmitEditing && onSubmitEditing();
    }
  };

  const handleActive = () => {
    setActive(!active);
    setTimeout(() => {
      togglePassword && togglePassword(active);
    }, 1);
  };

  return (
    <View style={{maxWidth: '90%'}}>
      <View style={[styles.labelContainer, labelStyle]}>
        {label && (
          <Text style={[styles.label, labelTextStyle]}>
            {label}
            <Text style={styles.redStar}>{isMandatory ? '*' : ''}</Text>
          </Text>
        )}
      </View>
      <View
        style={[
          activeBorder
            ? containerStyle.activeBordered
            : containerStyle.bordered,
          error ? containerStyle.errorBordered : null,
          style,
        ]}>
        <View style={styles.inputTextFieldView}>
          {leftIcon && (
            <Image
              resizeMode="contain"
              style={leftIconStyle}
              source={leftIcon}
            />
          )}
          <TextInput
            testID={testID ? testID : 'TEXTINPUT-1'}
            ref={ref}
            placeholderTextColor={placeholderTextColor ?? '#C4C9CC'}
            placeholder={placeholder}
            underlineColorAndroid={TRANSPARENT}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType}
            blurOnSubmit={blurOnSubmit}
            secureTextEntry={secureTextEntry}
            autoCorrect={false}
            returnKeyType={returnKeyType}
            numberOfLines={numberOfLines}
            selection={isSelection ? {start: 0, end: 0} : undefined}
            autoFocus={autoFocus}
            onSubmitEditing={onSubmit}
            editable={editable}
            pointerEvents={pointerEvents}
            autoCapitalize={autoCapitalize}
            style={[
              togglePassword ? {flex: 0.9} : {flex: 1},
              styles.input,
              TextInputStyle,
            ]}
            maxLength={maxLength}
            onTouchStart={onTouchStart}
            textAlignVertical={textAlignVertical}
            multiline={multiline}
            onFocus={() =>
              onFocus ? setActiveBorder(true) : setActiveBorder(false)
            }
            onBlur={() => setActiveBorder(false)}
          />
          {togglePassword && (
            <Pressable style={[styles.iconViewStyle]} onPress={handleActive}>
              <Image
                source={
                  secureTextEntry ? Images.ic_eye_visible : Images.ic_eye_hidden
                }
                style={styles.rightImageStyle}
                resizeMode="contain"
              />
            </Pressable>
          )}
          {rightIcon && (
            <Pressable
              style={[styles.iconViewStyle]}
              onPress={onPressRightIcon}>
              <Image
                source={rightIcon}
                style={[styles.rightImageStyle, rightImageStyle]}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
      </View>
      <Text style={[styles.errorText, errorTextStyle]} numberOfLines={3}>
        {error ?? ''}
      </Text>
    </View>
  );
});

export default React.memo(Input);

Input.defaultProps = {
  editable: true,
  type: 'default',
  label: null,
};
