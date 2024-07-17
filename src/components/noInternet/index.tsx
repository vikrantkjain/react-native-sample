import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {MatrixConstant, ToastRefType} from '@customTypes';
import {Toast} from '@components';
import {NetworkContext} from '@contexts/NetworkProvider';

const NoInternet: React.FC = () => {
  const {isConnected} = useContext(NetworkContext);
  const toastRef = useRef<ToastRefType | null>(null);

  const showToast = useCallback(() => {
    const title = isConnected ? 'Back online' : 'No internet';
    if (toastRef.current) {
      toastRef.current.show(title);
    }
  }, [isConnected]);
  useEffect(() => {
    showToast();
  }, [isConnected, showToast]);
  const onToastPress = () => {
    if (toastRef.current) {
      toastRef.current.close();
    }
  };
  return (
    <Toast
      style={styles.toastStyle}
      buttonText={isConnected ? 'retry' : 'ok'}
      onPress={onToastPress}
      ref={toastRef}
    />
  );
};

export default React.memo(NoInternet);

const styles = StyleSheet.create({
  toastStyle: {
    width: MatrixConstant.SCREEN_WIDTH * 0.9,
    top: 30,
  },
});
