import {BLUE, LocalStorageKeys, StoreConstantValues, WHITE} from '@constants';
import NavigationService from '@navigation/NavigationService';
import {getData} from '@utils';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Splash = () => {
  useEffect(() => {
    onSplash();
  }, []);

  const onSplash = async () => {
    const data = await getData(LocalStorageKeys.USER_DATA);
    if (data) {
      const mainData = JSON.parse(data);
      if (mainData?.token) {
        StoreConstantValues.USER_ACCESS_TOKEN = mainData?.token;
        NavigationService.navigateToClearStack('Profile');
      } else {
        NavigationService.navigateToClearStack('Login');
      }
    } else {
      NavigationService.navigateToClearStack('Login');
    }
    SplashScreen.hide();
  };
  return (
    <View style={styles.container}>
      <ActivityIndicator color={BLUE} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
});
