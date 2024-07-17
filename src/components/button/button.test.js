import React from 'react';
import {act} from 'react-test-renderer';
import Button from './index';
import {fireEvent, render, screen} from '@testing-library/react-native';
jest.mock('react-native-config', () => 'RNConfig');

const eventData = {
  nativeEvent: {
    pageX: 20,
    pageY: 30,
  },
};

describe('Button Testing with onPress event', () => {
  const onPressMock = jest.fn(() =>
    console.log('======== FUNCTION CALLED ========'),
  );
  const tree = render(
    <Button title="Title" onPress={onPressMock} disabled={false} />,
  );
  it('Render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('Render correctly', () => {
    const treeToJSON = tree.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
  act(() => {
    fireEvent.press(screen.getByTestId('BUTTON-TEST01'), eventData);
    expect(onPressMock);
  });
  it('Function not call when button is disabled', () => {
    const onPressDisabledMock = jest.fn(() => '=======DISABLED=======');
    render(
      <Button title="test" onPress={onPressDisabledMock} disabled={true} />,
    );
    fireEvent.press(screen.getByTestId('BUTTON-TEST01'));
    expect(onPressDisabledMock).not.toHaveBeenCalled();
  });
});
