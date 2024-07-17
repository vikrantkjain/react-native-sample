import RNSInfo from 'react-native-sensitive-info';
import {LocalStorageKeys} from '@constants';

export const storeData = async (key: string, value: string) => {
  try {
    await RNSInfo.setItem(key, value, {
      sharedPreferencesName: LocalStorageKeys.SHARED_PREFRENCE,
      keychainService: LocalStorageKeys.KEYCHAIN_SERVICE,
    });
  } catch (exception) {}
};

export const getData = async (key: string) => {
  try {
    const value = await RNSInfo.getItem(key, {
      sharedPreferencesName: LocalStorageKeys.SHARED_PREFRENCE,
      keychainService: LocalStorageKeys.KEYCHAIN_SERVICE,
    });
    return value;
  } catch (exception) {}
};

export const deleteData = async (key: string) => {
  try {
    await RNSInfo.deleteItem(key, {
      sharedPreferencesName: LocalStorageKeys.SHARED_PREFRENCE,
      keychainService: LocalStorageKeys.KEYCHAIN_SERVICE,
    });
    return true;
  } catch (exception) {
    return false;
  }
};

export const deleteDataOnReinStall = () => {
  deleteData(LocalStorageKeys.ACCESS_TOKEN);
  deleteData(LocalStorageKeys.USER_DATA);
  deleteData(LocalStorageKeys.DEVICE_TOKEN);
};
