import React, {useCallback, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
  Animated,
  Keyboard,
  Modal,
  Platform,
  Text,
  View,
  Pressable,
  Appearance,
} from 'react-native';
import {Image} from '@components';
import styles from './Styles';
import {DatePickerProps} from '@customTypes';
const deviceType = Platform.OS;

const FORMATS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm',
  time: 'HH:mm a',
  countdown: 'HH:mm a',
};

/**
 * DateTimePicker component.
 */

const DatePicker: React.FC<DatePickerProps> = ({
  mode = 'date',
  style,
  customStyles,
  disabled,
  minDate,
  maxDate,
  minuteInterval,
  timeZoneOffsetInMinutes,
  cancelBtnText,
  confirmBtnText,
  testID,
  cancelBtnTestID,
  confirmBtnTestID,
  allowFontScaling,
  locale,
  hideText,
  format = FORMATS[mode],
  placeholder,
  onOpenModal,
  onCloseModal,
  showIcon,
  iconSource,
  iconComponent,
  androidMode,
  date,
  onPressMask,
  onDateChange,
  getDateStr,
  height,
  duration,
}) => {
  const [themeScheme, setThemeScheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    Appearance.addChangeListener(val => {
      if (Platform.OS == 'ios') {
        setThemeScheme(val.colorScheme);
      }
    });
  }, []);

  const getDate = useCallback(
    (dateCB?: moment.MomentInput): Date => {
      dateCB = dateCB ?? date;
      if (!dateCB) {
        const now = new Date();
        if (minDate) {
          const _minDate = getDate(minDate);
          if (now < _minDate) {
            return _minDate;
          }
        }
        if (maxDate) {
          const _maxDate = getDate(maxDate);
          if (now > _maxDate) {
            return _maxDate;
          }
        }
        return now;
      }
      if (dateCB instanceof Date) {
        return dateCB;
      }
      return moment(dateCB, format).toDate();
    },
    [format, maxDate, minDate, date],
  );

  const [dateState, setDate] = useState<Date>(getDate());
  const [modalVisible, setIsModalVisible] = useState(false);
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const is24Hour = !format.match(/h|a/);

  useEffect(() => {
    if (date !== '') {
      if (
        mode === 'date' &&
        dateState &&
        moment(dateState).format('MM/DD/yyyy') === date
      ) {
        console.log('**');
      } else {
        setDate(getDate(date));
      }
    }
  }, [getDate, mode, date]);

  const dateInputStyle = [
    styles.dateInput,
    customStyles?.dateInput,
    disabled && styles.disabled,
    disabled && customStyles?.disabled,
  ];

  const getDateStrFun = (
    dateValue?: string | Date | undefined,
  ): string | Date => {
    dateValue = dateValue ?? date;
    // dateValue = dateValue ?? Platform.OS === 'android' ? date : iosDate;
    const dateInstance =
      dateValue instanceof Date ? dateValue : getDate(dateValue);
    if (typeof getDateStr === 'function') {
      return getDateStr && getDateStr(dateInstance);
    }
    return moment(dateInstance).format(format);
  };

  const onDateChangeFun = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const {type} = event;
    const currentDate = selectedDate || dateState;
    const delay = __DEV__ ? 10 : 5;
    if (deviceType === 'android') {
      setShowAndroidPicker(false);
      if (type === 'dismissed') {
      } else {
        setDate(currentDate);
        setTimeout(() => {
          datePicked(currentDate);
        }, delay);
      }
    } else {
      setTimeout(() => {
        setDate(currentDate);
      }, 200);
    }
  };

  const datePicked = (val = dateState) => {
    if (typeof onDateChange === 'function') {
      onDateChange && onDateChange(getDateStrFun(val), val);
    }
  };

  const getTitleElement = () => {
    if (!date && placeholder) {
      return (
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.placeholderText, customStyles?.placeholderText]}>
          {placeholder}
        </Text>
      );
    }
    return (
      <Text
        allowFontScaling={allowFontScaling}
        style={[styles.dateText, customStyles?.dateText]}>
        {`${getDateStrFun()}`}
      </Text>
    );
  };

  const onPressDate = () => {
    if (disabled) {
      return true;
    }
    if (deviceType === 'android') {
      setShowAndroidPicker(true);
      return false;
    }
    Keyboard.dismiss();
    setDate(getDate());
    if (deviceType === 'ios') {
      setModalVisible(true);
    }
    if (typeof onOpenModal === 'function') {
      onOpenModal && onOpenModal();
    }
  };
  const themeManagerIOS = React.useCallback(() => {
    if (Platform.OS == 'ios') {
      if (themeScheme == 'dark') {
        return {backgroundColor: '#000', color: '#fff'};
      } else {
        return {backgroundColor: '#fff', color: '#000'};
      }
    } else {
      return {};
    }
  }, [themeScheme]);

  const setModalVisible = (visible: boolean) => {
    // const {height, duration} = props;
    if (visible) {
      setIsModalVisible(visible);
      return Animated.timing(animatedHeight, {
        toValue: height ?? 0,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      return Animated.timing(animatedHeight, {
        toValue: 0,
        duration: duration ?? 0,
        useNativeDriver: false,
      }).start(() => {
        setIsModalVisible(visible);
      });
    }
  };

  const onPressMaskFun = () => {
    if (typeof onPressMask === 'function') {
      onPressMask && onPressMask();
    } else {
      onPressCancel();
    }
  };

  const onPressCancel = () => {
    setModalVisible(false);
    if (typeof onCloseModal === 'function') {
      onCloseModal && onCloseModal();
    }
  };

  const onPressConfirm = () => {
    datePicked();
    setModalVisible(false);
    if (typeof onCloseModal === 'function') {
      onCloseModal && onCloseModal();
    }
  };

  const renderIcon = () => {
    if (showIcon) {
      if (iconComponent) {
        return iconComponent;
      }
      if (iconSource) {
        return (
          <Image
            resizeMode="contain"
            style={[styles.dateIcon, customStyles?.dateIcon]}
            source={iconSource}
          />
        );
      }
      return null;
    }
    return null;
  };

  const dateTimePicker = () => {
    return (
      <DateTimePicker
        mode={mode}
        display={deviceType === 'android' ? androidMode : 'spinner'}
        value={dateState}
        is24Hour={is24Hour}
        onChange={onDateChangeFun}
        testID="DATE-TEST"
        minimumDate={minDate && getDate(minDate)}
        maximumDate={maxDate && getDate(maxDate)}
        minuteInterval={minuteInterval}
        timeZoneOffsetInMinutes={
          timeZoneOffsetInMinutes ? timeZoneOffsetInMinutes : undefined
        }
        style={[styles.datePicker, customStyles?.datePicker, themeManagerIOS()]}
        locale={locale}
      />
    );
  };

  return (
    <Pressable
      style={[styles.dateTouch, style]}
      onPress={onPressDate}
      testID={testID}>
      <View style={[styles.dateTouchBody, customStyles?.dateTouchBody]}>
        {!hideText ? (
          <View style={dateInputStyle}>{getTitleElement()}</View>
        ) : (
          <View />
        )}
        {renderIcon()}
        {showAndroidPicker && dateTimePicker()}
        {deviceType === 'ios' && (
          <Modal
            transparent={true}
            animationType="none"
            visible={modalVisible}
            supportedOrientations={[
              'portrait',
              'portrait-upside-down',
              'landscape',
              'landscape-left',
              'landscape-right',
            ]}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={styles.datePickerMaskContainerStyle}>
              <Pressable style={styles.datePickerMask} onPress={onPressMaskFun}>
                <Pressable style={styles.datePickerMaskContainerStyle}>
                  <Animated.View
                    style={[
                      styles.datePickerCon,
                      {height: animatedHeight},
                      customStyles?.datePickerCon,
                    ]}>
                    <View>
                      {/* <View pointerEvents={allowPointerEvents ? 'auto' : 'none'}> */}
                      {dateTimePicker()}
                    </View>
                    <Pressable
                      onPress={onPressCancel}
                      style={[
                        styles.btnText,
                        styles.btnCancel,
                        customStyles?.btnCancel,
                      ]}
                      testID={cancelBtnTestID}>
                      <Text
                        allowFontScaling={allowFontScaling}
                        style={[
                          styles.btnTextText,
                          styles.btnTextCancel,
                          customStyles?.btnTextCancel,
                        ]}>
                        {cancelBtnText}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={onPressConfirm}
                      style={[
                        styles.btnText,
                        styles.btnConfirm,
                        customStyles?.btnConfirm,
                      ]}
                      testID={confirmBtnTestID}>
                      <Text
                        allowFontScaling={allowFontScaling}
                        style={[
                          styles.btnTextText,
                          customStyles?.btnTextConfirm,
                        ]}>
                        {confirmBtnText}
                      </Text>
                    </Pressable>
                  </Animated.View>
                </Pressable>
              </Pressable>
            </View>
          </Modal>
        )}
      </View>
    </Pressable>
  );
};

export default React.memo(DatePicker);

DatePicker.defaultProps = {
  mode: 'date',
  androidMode: 'default',
  date: '',
  height: 259,
  duration: 300,
  confirmBtnText: 'OK',
  cancelBtnText: 'Cancel',
  customStyles: undefined,
  showIcon: true,
  disabled: false,
  allowFontScaling: true,
  hideText: false,
  placeholder: '',
  modalOnResponderTerminationRequest: () => true,
};
