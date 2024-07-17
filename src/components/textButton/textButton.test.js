import {fireEvent, render, screen} from '@testing-library/react-native';
import TextButton from './index';
import renderer from 'react-test-renderer';
const eventData = {
  nativeEvent: {
    pageX: 20,
    pageY: 30,
  },
};
describe('Test TextButton', () => {
  const onPressMock = jest.fn();
  const tree = renderer.create(
    <TextButton title="hey" onPress={onPressMock} />,
  );
  render(<TextButton title="hey" onPress={onPressMock} />);
  it('Render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('Render correctly', () => {
    const treeToJSON = tree.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
  fireEvent.press(screen.getByTestId('TEST_ID'), eventData);
  expect(onPressMock).toHaveBeenCalledWith(eventData);
});
