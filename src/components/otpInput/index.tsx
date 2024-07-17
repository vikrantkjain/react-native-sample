// import React, {Component} from 'react';
// import {
//   NativeSyntheticEvent,
//   TextInput,
//   TextInputKeyPressEventData,
//   View,
// } from 'react-native';
// import {BLACK, LIGHT_GRAY, DARK_CHARCOAL} from '../../constants/Colors';
// import styles from './Style';
// import {OTPTextViewProps} from '../../types/interface';

// const getOTPTextChucks = (
//   inputCount: number,
//   inputCellLength: number,
//   text: String,
// ) => {
//   let otpText: string[] =
//     text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];
//   otpText = otpText.slice(0, inputCount);
//   return otpText;
// };
// interface State {
//   focusedInput: number;
//   otpText: string[];
// }
// class OTPTextView extends Component<OTPTextViewProps, State> {
//   inputs: TextInput[] | [];
//   static defaultProps: OTPTextViewProps;
//   constructor(props: OTPTextViewProps) {
//     super(props);
//     this.state = {
//       focusedInput: 0,
//       otpText: getOTPTextChucks(
//         props.inputCount,
//         props.inputCellLength,
//         props.defaultValue,
//       ),
//     };

//     this.inputs = [];
//   }

//   basicValidation = (text: string) => {
//     const validText = /^[0-9a-zA-Z]+$/;
//     return text.match(validText);
//   };

//   onTextChange = (text: string, i: number) => {
//     const {inputCellLength, inputCount, handleTextChange} = this.props;

//     if (text && !this.basicValidation(text)) {
//       return;
//     }

//     this.setState(
//       prevState => {
//         let {otpText} = prevState;
//         otpText[i] = text;
//         return {
//           otpText,
//         };
//       },

//       () => {
//         handleTextChange && handleTextChange(this.state.otpText.join(''));
//         if (text.length === inputCellLength && i !== inputCount - 1) {
//           this.inputs[i + 1].focus();
//         } else if (i === inputCount - 1) {
//           this.inputs[i].focus();
//         }
//       },
//     );
//   };

//   onInputFocus = (i: number) => {
//     const {otpText} = this.state;
//     const prevIndex = i - 1;
//     if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
//       this.inputs[prevIndex].focus();
//       return;
//     }
//     this.setState({focusedInput: i});
//   };

//   onKeyPress = (
//     e: NativeSyntheticEvent<TextInputKeyPressEventData>,
//     i: number,
//   ) => {
//     if (e.nativeEvent.key === 'Backspace' && i !== 0) {
//       this.inputs[i - 1].focus();
//     }
//   };

//   clear = () => {
//     this.setState({otpText: []}, () => {
//       this.inputs[0].focus();
//     });
//   };

//   setValue = (value: string) => {
//     const {inputCount, inputCellLength} = this.props;
//     this.setState(
//       {
//         otpText: getOTPTextChucks(inputCount, inputCellLength, value),
//       },
//       () => {
//         this.props.handleTextChange && this.props.handleTextChange(value);
//       },
//     );
//   };

//   render() {
//     const {
//       inputCount,
//       inputCellLength,
//       containerStyle,
//       textInputStyle,
//       keyboardType,
//       ...textInputProps
//     } = this.props;

//     const {otpText} = this.state;
//     const TextInputs = [];

//     for (let i = 0; i < inputCount; i += 1) {
//       const inputStyle = [
//         styles.textInput,
//         textInputStyle,
//         {borderColor: DARK_CHARCOAL},
//       ];

//       if (otpText[i]) {
//         inputStyle.push({
//           borderColor: DARK_CHARCOAL,
//         });
//       }
//       TextInputs.push(
//         <TextInput
//           placeholder=""
//           ref={e => (e ? (this.inputs[i] = e) : null)}
//           key={i}
//           placeholderTextColor={LIGHT_GRAY}
//           autoCorrect={false}
//           keyboardType={keyboardType}
//           autoFocus={false}
//           value={otpText[i] || ''}
//           style={inputStyle}
//           maxLength={inputCellLength}
//           onFocus={() => this.onInputFocus(i)}
//           onChangeText={text => this.onTextChange(text, i)}
//           multiline={false}
//           onKeyPress={e => this.onKeyPress(e, i)}
//           {...textInputProps}
//         />,
//       );
//     }
//     return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
//   }
// }

// OTPTextView.defaultProps = {
//   defaultValue: '',
//   inputCount: 4,
//   tintColor: BLACK,
//   offTintColor: LIGHT_GRAY,
//   inputCellLength: 1,
//   containerStyle: {},
//   textInputStyle: {},
//   handleTextChange: () => {},
//   keyboardType: 'numeric',
// };

// export default OTPTextView;
