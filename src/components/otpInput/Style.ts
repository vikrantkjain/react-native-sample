import {StyleSheet} from 'react-native';
import {BLACK, FontFamily} from '@constants';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 70,
    width: 60,
    textAlign: 'center',
    fontSize: 22,
    marginRight: 4,
    borderColor: '#E9E9E9',
    borderBottomWidth: 2,
    fontFamily: FontFamily.medium,
    color: BLACK,
  },
});

export default styles;
