import React from 'react';
import renderer from 'react-test-renderer';
import Camera from './index';

jest.mock('react-native-image-crop-picker', () => 'ImagePicker');
jest.mock('react-native-vision-camera', () => ({
  useCameraDevices: jest.fn(),
  Camera: jest.fn(),
  CameraDevices: jest.fn(),
  CameraDevice: jest.fn(),
}));
jest.mock('react-native-config', () => 'RNConfig');
jest.mock('react-native-simple-toast', () => 'Toast');
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');
jest.mock('react-native-sensitive-info', () => 'RNSInfo');

test('Camera renders correctly', () => {
  const onCaptureTestMock = jest.fn();
  const onBackMock = jest.fn();
  const tree = renderer
    .create(
      <Camera
        cropping={true}
        onCapture={onCaptureTestMock}
        onBack={onBackMock}
        width={100}
        height={10}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
