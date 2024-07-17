import Toast from './index';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Pressable} from 'react-native';
import renderer from 'react-test-renderer';
import {act} from 'react-test-renderer';
describe('Test Toast component', () => {
  const ref = {
    current: {
      show: jest.fn(),
    },
  };
  const tree = render(
    <Pressable testID="TEST-1" onPress={() => ref.current.show()}>
      <Toast ref={ref} />
    </Pressable>,
  );
  it('Render successfully', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  act(() => {
    fireEvent.press(screen.getByTestId('TEST-1'));
    expect(ref?.current?.show());
  });
  // it('call ref ', () => {
  //   fireEvent.press(screen.getByTestId('TEST-1'));
  //   expect(ref?.current?.show());
  // });
});
