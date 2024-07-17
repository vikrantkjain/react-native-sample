import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  profileImageStyles: {
    alignSelf: 'center',
    margin: 10,
  },
  topImageView: {
    borderWidth: 5,
    borderColor: 'rgba(245,192,32,1)',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  profileStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  innerImageView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    backgroundColor: '#FFF',
    borderColor: 'rgba(245,192,32,1)',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
    right: -5,
    bottom: 9,
  },

  innerImage: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
});

export default styles;
