import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * @param {*} key - key of data to store.
 * @param {*} value - value of data to store.
 */
export const storeDataInAsync = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    return false;
  }
};

/**
 *
 * @param {*} key - key of data to store.
 */
export const getDataFromAsync = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e: unknown) {
    return false;
  }
};

/**
 *
 * @param {*} key - key of data to remove.
 */
export const removeDataInAsync = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    return false;
  }
};

/**
 *
 * Clear all data from AsyncStorage
 */
export const clearAllInAsync = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    return false;
  }
};

/**
 *
 * @param {*} keys - Array of keys to remove from AsyncStorage.
 */
export const removeMultiDataInAsync = async (keys: readonly string[]) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    return false;
  }
};
