import {I18nManager, Platform, StatusBar, StyleSheet} from 'react-native';
import {AZURE_BLUE, BLACK, WHITE} from '@constants';
import {MatrixConstant} from '@customTypes';

const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: AZURE_BLUE,
    height: MatrixConstant.SCREEN_HEIGHT * 0.1,
  },
  safeAreaViewStyle: {
    flex: 1,
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    flex: 1,
    marginTop: 5,
    fontSize: 15,
    color: '#000',
  },
  selectedCountryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectDefaultCountryContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openCountryDropDownStyle: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 5,
  },
  listViewRowContainer: {
    flexDirection: 'row',
    paddingStart: 15,
    margin: 10,
  },
  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  countryFlagContainer: {
    width: 32,
    paddingRight: 8,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownImageStyle: {
    width: 15,
    marginLeft: 5,
    paddingRight: 5,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarStyle: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: WHITE,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 15,
    paddingRight: 10,
    height: 40,
  },
  commonHeader: {
    height: 65 + statusBarHeight,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  header: {
    backgroundColor: AZURE_BLUE,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  backImage: {
    height: 30,
    width: 25,
    marginVertical: 5,
  },
  hitSlop: {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
  hideCountryStyle: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#D3D3D3',
    width: '95%',
    height: 0.8,
  },
  showCountryStyle: {
    marginLeft: 12,
    marginRight: 10,
    backgroundColor: '#D3D3D3',
    width: '95%',
    height: 0.8,
  },
  flatListStyle: {},
  emptyList: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  noData: {
    fontSize: 16,
    color: BLACK,
  },
  containerStyle: {
    height: 60,
    width: 250,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#303030',
    backgroundColor: 'white',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
    textAlign: 'right',
  },
});

export default styles;
