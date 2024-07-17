import {render, fireEvent, screen} from '@testing-library/react-native';
import Input from './index';

describe('Test Input', () => {
  const onChangeTestMock = jest.fn();
  const changeText = 'Hello';
  const tree = render(<Input onChangeText={onChangeTestMock} />);
  it('Render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('Render Correctly', () => {
    const treeToJSON = tree.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
  fireEvent.changeText(screen.getByTestId('TEXTINPUT-1'), changeText);
});
