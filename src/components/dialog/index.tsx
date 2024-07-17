import React from 'react';
import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';
import {MatrixConstant, DialogProps} from '@customTypes';
import {Text, TextButton} from '@components';

const Dialog: React.FC<DialogProps> = ({
  visible,
  animationType,
  onRequestClose,
  onDismiss,
  transparent,
  statusBarTranslucent,
  onShow,
  title,
  okText,
  cancelText,
  okButtonStyle,
  cancelButtonStyle,
  okPress,
  cancelPress,
}) => {
  return (
    <Modal
      onRequestClose={onRequestClose}
      onDismiss={onDismiss}
      transparent={transparent}
      statusBarTranslucent={statusBarTranslucent}
      onShow={onShow}
      visible={visible}
      animationType={animationType}>
      <SafeAreaView style={styles.container}>
        <View style={styles.centerDialog}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.options}>
            <TextButton
              testID={'TestButton-testID'}
              textStyle={styles.optionText}
              style={[styles.okButton, okButtonStyle]}
              title={okText}
              onPress={okPress}
            />
            <TextButton
              textStyle={styles.optionText}
              style={[styles.cancelButton, cancelButtonStyle]}
              title={cancelText}
              onPress={cancelPress}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default React.memo(Dialog);

Dialog.defaultProps = {
  title: 'Are you sure?',
  okText: 'Yes',
  cancelText: 'No',
  visible: false,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centerDialog: {
    alignSelf: 'center',
    width: MatrixConstant.SCREEN_WIDTH * 0.9,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  okButton: {
    backgroundColor: '#3486eb',
    width: MatrixConstant.SCREEN_WIDTH * 0.38,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  cancelButton: {
    backgroundColor: 'lightgrey',
    width: MatrixConstant.SCREEN_WIDTH * 0.38,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  optionText: {
    color: '#fff',
  },
});
