import {
  BLUE,
  DARK_MAIN,
  FontFamily,
  FontSize,
  GUN_SMOKE,
  LIGHT_BORDER,
  MAIN_COLOR,
  WHITE,
} from '@constants';
import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingBottom: 20,
  },
  contentStyle: {
    flex: 1,
  },
  inputContainerStyle: {
    padding: Platform.OS === 'android' ? 0 : 7,
    width: '100%',
  },
  inputContainerStyle1: {
    marginTop: 0,
    width: '100%',
  },
  mainView: {flex: 1, justifyContent: 'center'},
  signInTextStyle: {color: 'green'},
  signUpButtonStyle: {backgroundColor: 'green'},
  signUpButtonTextStyle: {fontWeight: 'bold'},
  touchableTextView: {
    flexDirection: 'row',
    marginTop: '10%',
    alignSelf: 'center',
  },
  logoContainer: {
    paddingTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {height: 25, width: 25, marginRight: 10},
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h2,
    color: MAIN_COLOR,
  },
  wbTitle: {
    fontSize: FontSize.h1,
    fontFamily: FontFamily.bold,
    color: MAIN_COLOR,
  },
  wbMessage: {
    fontSize: FontSize.h6,
    fontFamily: FontFamily.medium,
    color: GUN_SMOKE,
    marginTop: '2.5%',
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotText: {
    color: BLUE,
    fontSize: FontSize.t1,
    fontFamily: FontFamily.medium,
  },
  buttonStyle: {
    backgroundColor: BLUE,
    marginTop: '3%',
    width: '100%',
    alignItems: 'center',
  },
  googleButtonStyle: {
    backgroundColor: WHITE,
    marginTop: '3%',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  buttonTextStyle: {
    color: WHITE,
    fontFamily: FontFamily.bold,
    fontSize: FontSize.t1,
  },
  googleButtonTextStyle: {
    color: DARK_MAIN,
    fontFamily: FontFamily.bold,
    fontSize: FontSize.t1,
  },
  createAccount: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.t1,
    color: GUN_SMOKE,
  },
  signUpTextStyle: {
    color: DARK_MAIN,
    fontFamily: FontFamily.bold,
    fontSize: FontSize.t1,
    textDecorationLine: 'underline',
  },
});
