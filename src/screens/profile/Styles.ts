import {
  BLUE,
  FontFamily,
  FontSize,
  GUN_SMOKE,
  MAIN_COLOR,
  PLATINUM,
  WHITE,
} from '@constants';
import {StyleSheet} from 'react-native';

import {MatrixConstant} from '@customTypes';
const IMAGE_HEIGHT = 20;
export const styles = StyleSheet.create({
  logoContainer: {
    paddingTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {height: 25, width: 25, marginRight: 10},
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h2,
    color: MAIN_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headerContainer: {
    paddingBottom: 15,
    backgroundColor: BLUE,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.h6,
    fontFamily: FontFamily.bold,
    color: WHITE,
    textAlign: 'center',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    marginTop: -IMAGE_HEIGHT,
    marginRight: 15,
  },
  logoutButtonImg: {
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
  },
  listContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  listContainContainer: {
    width: MatrixConstant.SCREEN_WIDTH * 0.9,
    padding: 15,
  },
  listStyle: {
    borderWidth: 1,
    borderColor: PLATINUM,
    borderRadius: 5,
    marginTop: '10%',
  },
  renderContainer: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: PLATINUM,
    flexDirection: 'row',
    padding: 15,
  },
  titleKey: {
    fontSize: FontSize.t1,
    fontFamily: FontFamily.medium,
    color: GUN_SMOKE,
  },
  titleValue: {
    fontSize: FontSize.t1,
    fontFamily: FontFamily.medium,
    color: MAIN_COLOR,
  },
});
