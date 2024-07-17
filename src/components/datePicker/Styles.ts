import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dateTouch: {
    width: '100%',
  },
  datePickerMaskContainerStyle: {flex: 1},
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateIcon: {
    width: 25,
    height: 25,

    marginRight: 5,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  dateText: {
    color: '#333',
  },
  placeholderText: {
    color: '#8C8C8C',
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077',
  },
  datePickerCon: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden',
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextText: {
    fontSize: 16,
    color: '#eb6287',
  },
  btnTextCancel: {
    color: '#666',
  },
  btnCancel: {
    left: 0,
  },
  btnConfirm: {
    right: 0,
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  disabled: {
    backgroundColor: '#eee',
  },
});

export default styles;
