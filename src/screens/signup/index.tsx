import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
} from 'react-native';
import {Images, Strings, appInfo} from '@constants';
import NavigationService from '@navigation/NavigationService';
import {Input, Button, Image, Toast} from '@components';
import {showAlert, validate} from '@utils';
import {KeyboardTypes, ToastRefType} from '@customTypes';
import {styles} from './Styles';
import {commonApi} from '@api/CommonApi';
import {SIGN_UP} from '@api/EndPoints';

const Signup = () => {
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [isPasswordEnable, setIsPasswordEnable] = useState<boolean>(true);
  const [isConfirmPasswordEnable, setIsConfirmPasswordEnable] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastNameRef = useRef<TextInput>(null);
  const mobRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const toastRef = useRef<ToastRefType>(null);
  /**
   * validations for signUp form
   */
  const {
    confirmPasswordError,
    emailError,
    nameError,
    numberError,
    passwordError,
    lastNameError,
  } = validate({
    nameError: name,
    lastNameError: lastName,
    emailError: email,
    passwordError: password,
    numberError: number,
    confirmPasswordError: confirmPassword,
  });

  /**
   *
   * @param text
   * changeText for firstName
   */
  const onChangeTextName = (text: string) => {
    setName(text);
  };

  /**
   *
   * @param text
   * changeText for LastName
   */
  const onChangeTextLastName = (text: string) => {
    setLastName(text);
  };
  /**
   *
   * @param text
   * changeText for email
   */
  const onChangeTextEmail = (text: string) => {
    setEmail(text);
  };
  /**
   *
   * @param text
   * changeText for password
   */
  const onChangeTextPassword = (text: string) => {
    setPassword(text);
  };
  /**
   *
   * @param text
   * changeText for phoneNumber
   */
  const onChangeTextPhoneNo = (text: string) => {
    setNumber(text.replace(/[^0-9]+/g, ''));
  };
  /**
   * @param text
   * changeText for confirm password
   */
  const onChangeTextCnfPassword = (text: string) => {
    setConfirmPassword(text);
  };

  /**
   * check validation and call signUp API
   */
  const onPressSignUp = () => {
    if (
      !name ||
      nameError ||
      !lastName ||
      lastNameError ||
      !email ||
      emailError ||
      !number ||
      numberError ||
      !password ||
      passwordError ||
      !confirmPassword ||
      confirmPasswordError
    ) {
      setName(name ? name : '');
      setLastName(lastName ? lastName : '');
      setEmail(email ? email : '');
      setNumber(number ? number : '');
      setPassword(password ? password : '');
      setConfirmPassword(confirmPassword ? confirmPassword : '');
    } else {
      setIsLoading(true);
      signUpApiCall();
    }
  };

  const signUpApiCall = async () => {
    const params = {
      firstName: name,
      lastName: lastName,
      phoneNumber: number,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      countryPhoneCode: '+91',
    };
    await commonApi({
      url: appInfo.mainDomain + SIGN_UP,
      method: 'POST',
      params,
    })
      .then(res => {
        setIsLoading(false);
        if (res?.status == 200 && res?.data?.success) {
          toastRef?.current?.show(Strings.signUpSuccessfully);
          setTimeout(() => {
            NavigationService.navigateToClearStack('Login');
          }, 1000);
        }
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  /**
   * toggle password
   */
  const _handleSecurePasswordEnable = () => {
    setIsPasswordEnable(!isPasswordEnable);
  };

  /**
   * toggle confirmPassword password
   */
  const _handleSecurePasswordEnable2 = () => {
    setIsConfirmPasswordEnable(!isConfirmPasswordEnable);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'android' ? 25 : 0}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.scrollContainer}
          style={styles.contentStyle}>
          <View style={styles.logoContainer}>
            <Image source={Images.ic_demoCodeLogo} style={styles.logo} />
            <Text style={styles.title}>{Strings.title}</Text>
          </View>
          <View style={{marginTop: '8%', alignItems: 'center'}}>
            <Text style={styles.wbTitle}>{Strings.wb}</Text>
            <Text style={styles.wbMessage}>{Strings.wbMessage}</Text>
          </View>
          <View style={{marginTop: '8%'}}>
            <Input
              label={Strings.firstName}
              placeholder={Strings.firstName}
              value={name}
              onChangeText={onChangeTextName}
              blurOnSubmit={true}
              error={nameError}
              returnKeyType={KeyboardTypes.NEXT}
              autoCapitalize={KeyboardTypes.NONE}
              onSubmitEditing={() => {
                lastNameRef.current?.focus();
              }}
            />
            <Input
              ref={lastNameRef}
              label={Strings.lastName}
              placeholder={Strings.lastName}
              value={lastName}
              onChangeText={onChangeTextLastName}
              blurOnSubmit={true}
              error={lastNameError}
              returnKeyType={KeyboardTypes.NEXT}
              autoCapitalize={KeyboardTypes.NONE}
              onSubmitEditing={() => {
                mobRef.current?.focus();
              }}
            />
            <Input
              ref={mobRef}
              label={Strings.mobileNumber}
              placeholder={Strings.mobileNumber}
              value={number}
              onChangeText={onChangeTextPhoneNo}
              blurOnSubmit={true}
              maxLength={15}
              error={numberError}
              returnKeyType={KeyboardTypes.NEXT}
              keyboardType={KeyboardTypes.NUMBER}
              onSubmitEditing={() => {
                emailRef.current?.focus();
              }}
            />
            <Input
              ref={emailRef}
              label={Strings.email}
              placeholder={Strings.email}
              value={email}
              onChangeText={onChangeTextEmail}
              blurOnSubmit={true}
              error={emailError}
              returnKeyType={KeyboardTypes.NEXT}
              autoCapitalize={KeyboardTypes.NONE}
              keyboardType={KeyboardTypes.EMAIL}
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
            />

            <Input
              ref={passwordRef}
              label={Strings.password}
              placeholder={Strings.password}
              value={password}
              secureTextEntry={isPasswordEnable}
              error={passwordError}
              enableRightView={true}
              returnKeyType={KeyboardTypes.NEXT}
              onChangeText={onChangeTextPassword}
              onPressRightIcon={_handleSecurePasswordEnable}
              rightIcon={
                !isPasswordEnable ? Images.ic_eye_hidden : Images.ic_eye_visible
              }
              onSubmitEditing={() => {
                confirmPasswordRef.current?.focus();
              }}
            />
            <Input
              ref={confirmPasswordRef}
              label={Strings.confirmPassword}
              placeholder={Strings.confirmPassword}
              value={confirmPassword}
              secureTextEntry={isConfirmPasswordEnable}
              error={confirmPasswordError}
              returnKeyType={KeyboardTypes.DONE}
              onChangeText={onChangeTextCnfPassword}
              onPressRightIcon={_handleSecurePasswordEnable2}
              rightIcon={
                !isConfirmPasswordEnable
                  ? Images.ic_eye_hidden
                  : Images.ic_eye_visible
              }
            />
            <Button
              onPress={onPressSignUp}
              title={Strings.signUpText}
              buttonTextStyle={styles.buttonTextStyle}
              style={styles.buttonStyle}
              loading={isLoading}
            />
            <Button
              onPress={() => showAlert(Strings.notAvailable)}
              title={Strings.continueWithGoogle}
              buttonTextStyle={styles.googleButtonTextStyle}
              style={styles.googleButtonStyle}
              leftImage={Images.ic_google}
              showLeftImage
            />
            <View style={styles.touchableTextView}>
              <Text style={styles.createAccount}>
                {Strings.alreadyHaveAnAccount}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => NavigationService.navigate('Login')}>
                <Text style={styles.signUpTextStyle}>{Strings.login}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast ref={toastRef} />
    </SafeAreaView>
  );
};

export default Signup;
