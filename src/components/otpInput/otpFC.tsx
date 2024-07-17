import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';
import styles from './Style';
import {OTPTextViewProps, OtpInputRefType} from '@customTypes';
import {BLACK, LIGHT_GRAY, DARK_CHARCOAL} from '@constants';

const getOTPTextChucks = (
  inputCount: number,
  inputCellLength: number,
  text: String,
) => {
  let otpText: string[] =
    text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];
  otpText = otpText.slice(0, inputCount);
  return otpText;
};
interface State {
  focusedInput: number;
  otpText: string[];
}
const OTPTextView = forwardRef(
  (props: OTPTextViewProps, ref: React.ForwardedRef<OtpInputRefType>) => {
    const {
      defaultValue = '',
      inputCellLength = 1,
      inputCount,
      containerStyle,
      handleTextChange,
      inputType,
      keyboardType,
      offTintColor,
      textInputStyle,
      tintColor,
      ...textInputProps
    } = props;
    let inputs: TextInput[] = new Array(inputCount).fill(TextInput);
    const [state, setState] = useState<State>({
      focusedInput: 0,
      otpText: [],
    });
    useEffect(() => {
      setState({
        focusedInput: 0,
        otpText: getOTPTextChucks(inputCount, inputCellLength, defaultValue),
      });
      inputs = [];
    }, []);
    useImperativeHandle(ref, () => ({
      clear: () => {
        clearFun();
      },
      setValue: (value: string) => {
        setValueFun(value);
      },
    }));

    const basicValidation = (text: string) => {
      const validText = /^[0-9a-zA-Z]+$/;
      return text.match(validText);
    };

    const onTextChange = (text: string, i: number) => {
      if (text && !basicValidation(text)) {
        return;
      }
      setState(prev => {
        let {otpText} = prev;
        otpText[i] = text;
        handleTextChange && handleTextChange(otpText.join(''));
        return {
          ...prev,
          otpText,
        };
      });

      if (text.length === inputCellLength && i !== inputCount - 1) {
        inputs[i + 1].focus();
      } else if (i === inputCount - 1) {
        inputs[i].focus();
      }
    };
    const onInputFocus = (i: number) => {
      const {otpText} = state;
      const prevIndex = i - 1;
      if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
        inputs[prevIndex].focus();
        return;
      }
      setState({...state, focusedInput: i});
    };
    const onKeyPress = (
      e: NativeSyntheticEvent<TextInputKeyPressEventData>,
      i: number,
    ) => {
      if (e.nativeEvent.key === 'Backspace' && i !== 0) {
        inputs[i - 1]?.focus();
      }
    };
    const clearFun = () => {
      setState({focusedInput: 0, otpText: []});
      inputs[0].focus();
    };
    const setValueFun = (value: string) => {
      setState({
        ...state,
        otpText: getOTPTextChucks(inputCount, inputCellLength, value),
      });
      handleTextChange && handleTextChange(value);
    };
    const {otpText} = state;
    const TextInputs = [];
    for (let i = 0; i < inputCount; i += 1) {
      const inputStyle = [
        styles.textInput,
        textInputStyle,
        {borderColor: DARK_CHARCOAL},
      ];

      if (otpText[i]) {
        inputStyle.push({
          borderColor: DARK_CHARCOAL,
        });
      }
      TextInputs.push(
        <TextInput
          placeholder=""
          ref={e => (e ? (inputs[i] = e) : null)}
          key={i}
          placeholderTextColor={LIGHT_GRAY}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoFocus={false}
          value={otpText[i] || ''}
          style={inputStyle}
          multiline={false}
          maxLength={1}
          textAlign={'center'}
          onFocus={() => onInputFocus(i)}
          onChangeText={text => onTextChange(text, i)}
          onKeyPress={e => onKeyPress(e, i)}
          {...textInputProps}
        />,
      );
    }
    return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
  },
);

OTPTextView.defaultProps = {
  defaultValue: '',
  inputCount: 4,
  tintColor: BLACK,
  offTintColor: LIGHT_GRAY,
  inputCellLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: () => {},
  keyboardType: 'numeric',
};
export default React.memo(OTPTextView);
