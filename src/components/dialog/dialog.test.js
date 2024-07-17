import React from 'react';
import Dialog from './index';
import {render, screen, fireEvent} from '@testing-library/react-native';
const mockReanimated = jest.requireMock('react-native-reanimated');
const mockCam = jest.requireMock('react-native-vision-camera');
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(),
}));
jest.mock('react-native-reanimated', () => {
  return {
    ...mockReanimated,
    useSharedValue: jest.fn,
    useAnimatedStyle: jest.fn,
  };
});
jest.mock('react-native-image-crop-picker', () => 'ImagePicker');
jest.mock('react-native-simple-toast', () => 'Toast');
jest.mock('react-native-config', () => 'RNConfig');
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');
jest.mock('react-native-sensitive-info', () => 'RNSInfo');
jest.mock('@react-native-community/netinfo', () => 'NetInfo');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-vision-camera', () => {
  return {
    ...mockCam,
    useCameraDevices: jest.fn,
  };
});

const eventData = {
  nativeEvent: {
    pageX: 20,
    pageY: 30,
  },
};

describe('Dialog render correctly with testing lib', () => {
  const onPressMock = jest.fn(() => null);
  const tree = render(
    <Dialog
      visible={true}
      animationType="fade"
      okPress={onPressMock}
      title="Test title"
    />,
  );
  it('Renders successfully', () => {
    expect(tree).toBeDefined();
  });
  it('renders correctly', () => {
    const treeAsJSON = tree.toJSON();
    expect(treeAsJSON).toMatchSnapshot();
  });
  fireEvent.press(screen.getByTestId('TestButton-testID'), eventData);
  expect(onPressMock).toHaveBeenCalledWith(eventData);
});
