import {fireEvent, render, screen} from '@testing-library/react-native';
import FloatingInput from './index';

describe('Test for FloatingInput', () => {
  const onChangeTextMock = jest.fn();
  const changeText = 'Hello';
  const tree = render(<FloatingInput onChangeText={onChangeTextMock} />);
  it('Render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('Render correctly', () => {
    const treeToJSON = tree.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
  fireEvent.changeText(screen.getByTestId('Floating-input'), changeText);
});
