import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Image, Input} from '@components';
import {
  AppConstants,
  Images,
  LocalStorageKeys,
  StoreConstantValues,
  Strings,
  Validation,
  appInfo,
} from '@constants';
import NavigationService from '@navigation/NavigationService';
import {showAlert, storeData, validate} from '@utils';
import {KeyboardTypes} from '@customTypes';
import {styles} from './Styles';
import {commonApi} from '@api/CommonApi';
import {SIGN_IN} from '@api/EndPoints';
const SignIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isPasswordEnable, setIsPasswordEnable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mPasswordRef = useRef<TextInput | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');
  /**
   * @variation for Email
   */
  const {emailError} = validate({
    emailError: email,
  });

  /**
   *
   * @param text:string
   * with remove space regex
   */
  const onChangeTextEmail = (text: string) => {
    setEmail(text.replace(/\s/g, ''));
  };

  /**
   *
   * @param text:string
   * with set the password value and password validation
   */
  const onChangeTextPassword = (text: string) => {
    setPassword(text);
    setPasswordError(!text ? Validation.validPassword : '');
  };

  /**
   * toggle password
   */
  const _handleSecurePasswordEnable = () => {
    setIsPasswordEnable(!isPasswordEnable);
  };

  /**
   * Check the email and password then call login api
   */
  const onPressSignIn = () => {
    if (!email || emailError || !password || passwordError) {
      setEmail(!email ? '' : email);
      setPassword(!password ? '' : password);
      setPasswordError(!password ? Validation.validPassword : '');
    } else {
      setIsLoading(true);
      getSignInApiCall(email, password);
    }
  };

  /**
   *
   * @param emailValue
   * @param passwordValue
   * call login API
   */
  const getSignInApiCall = async (
    emailValue: string,
    passwordValue: string,
  ) => {
    const params = {
      emailOrMobile: emailValue,
      password: passwordValue,
      countryPhoneCode: '+91',
    };
    await commonApi({
      url: appInfo.mainDomain + SIGN_IN,
      method: 'POST',
      params,
    })
      .then(async res => {
        if (res?.status == 200 && res?.data?.success) {
          await storeData(
            LocalStorageKeys.USER_DATA,
            JSON.stringify(res?.data?.data ?? {}),
          );
          StoreConstantValues.USER_ACCESS_TOKEN = res?.data?.data?.token;
          NavigationService.navigateToClearStack('Profile');
        }
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'android' ? 25 : 0}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.scrollView]}>
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
              label={Strings.email}
              placeholder={Strings.email}
              value={email}
              error={emailError}
              onChangeText={onChangeTextEmail}
              blurOnSubmit={true}
              keyboardType={KeyboardTypes.EMAIL}
              returnKeyType={KeyboardTypes.NEXT}
              autoCapitalize={KeyboardTypes.NONE}
              onSubmitEditing={() => mPasswordRef?.current?.focus()}
            />
            <Input
              ref={mPasswordRef}
              label={Strings.password}
              placeholder={Strings.password}
              value={password}
              error={passwordError}
              secureTextEntry={isPasswordEnable}
              enableRightView={true}
              returnKeyType={KeyboardTypes.DONE}
              onChangeText={onChangeTextPassword}
              rightIcon={
                !isPasswordEnable ? Images.ic_eye_hidden : Images.ic_eye_visible
              }
              onPressRightIcon={_handleSecurePasswordEnable}
            />
            <View style={styles.forgotRow}>
              <TouchableOpacity
                activeOpacity={AppConstants.TOUCH_OPACITY}
                onPress={() => showAlert(Strings.notAvailable)}>
                <Text style={styles.forgotText}>{Strings.forgotPassword}</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: '5%'}}>
              <Button
                onPress={() => onPressSignIn()}
                title={Strings.login}
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
            </View>
            <View style={styles.createAccountViewStyle}>
              <Text style={styles.createAccount}>{Strings.createAccount} </Text>
              <TouchableOpacity
                onPress={() => NavigationService.navigate('Signup')}>
                <Text style={styles.signUpTextStyle}>{Strings.signup}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
