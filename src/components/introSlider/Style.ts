import {StyleSheet, Dimensions} from 'react-native';
const DEFAULT_DOT_RADIUS = 8;
const {width, height} = Dimensions.get('window');
const DOT_SIZE = 40;

const styles = StyleSheet.create({
  pagerViewStyle: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
  },
  pagination: {
    bottom: '12%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DEFAULT_DOT_RADIUS,
    height: DEFAULT_DOT_RADIUS,
    borderRadius: DEFAULT_DOT_RADIUS >> 1,
    backgroundColor: 'rgba(67, 171, 255, 0.4)',
    margin: DEFAULT_DOT_RADIUS >> 1,
  },
  paginationDotActive: {
    backgroundColor: '#14A7B5',
    width: DEFAULT_DOT_RADIUS,
    height: DEFAULT_DOT_RADIUS,
    borderRadius: DEFAULT_DOT_RADIUS >> 1,
    margin: DEFAULT_DOT_RADIUS >> 1,
  },
  paginationDotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DEFAULT_DOT_RADIUS,
    height: DEFAULT_DOT_RADIUS,
    borderRadius: DEFAULT_DOT_RADIUS >> 1,
    backgroundColor: 'rgba(67, 171, 255, 0.4)',
    margin: DEFAULT_DOT_RADIUS >> 1,
  },
});

export default styles;
