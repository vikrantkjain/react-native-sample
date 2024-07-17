import {fireEvent, render, screen} from '@testing-library/react-native';
import Searchbar from './index';

describe('Test SearchBar', () => {
  const onChangeTestMock = jest.fn();
  const CHANGE_TEXT = 'content';
  const tree = render(<Searchbar onChangeText={onChangeTestMock} />);
  it('Render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('Render correctly', () => {
    const treeAsJSON = tree.toJSON();
    expect(treeAsJSON).toMatchSnapshot();
  });
  fireEvent.changeText(screen.getByTestId('TEST-SEARCHBAR'), CHANGE_TEXT);
});
