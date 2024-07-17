import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
require('@shopify/flash-list/jestSetup');
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('react-native-config', () => 'RNConfig');
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
jest.mock('react-native-image-crop-picker', () => 'ImagePicker');
jest.mock('react-native-simple-toast', () => 'Toast');
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');
jest.mock('react-native-sensitive-info', () => 'RNSInfo');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-vision-camera', () => ({}));
jest.mock('react-native-custom-star-rating', () => 'Rating');
jest.mock('react-native-splash-screen', () => {
  return {
    hide: () => true,
  };
});
