import {ExpandableList} from '../index';
import {render, fireEvent} from '@testing-library/react-native';

const mockTab = jest.requireMock('@react-navigation/bottom-tabs');
jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    ...mockTab,
    createBottomTabNavigator: jest.fn,
  };
});
jest.mock('react-native-reanimated', () => {});
jest.mock('react-native-image-crop-picker', () => 'ImagePicker');
jest.mock('react-native-simple-toast', () => 'Toast');
jest.mock('react-native-config', () => 'RNConfig');
jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');
jest.mock('react-native-sensitive-info', () => 'RNSInfo');
jest.mock('@react-native-community/netinfo', () => 'NetInfo');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-vision-camera', () => {});

// describe('Test for ExpandableList', () => {
//   it('Reacts to press', () => {
//     const data = [
//       {
//         id: 0,
//         question: 'How can we schedule 1:1 sessions?',
//         answer:
//           'Lorem ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
//       },
//       {
//         id: 1,
//         question: 'How can I enter into group sessions?',
//         answer:
//           'Lorem ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
//       },
//       {
//         id: 2,
//         question: 'What are the refund policy?',
//         answer:
//           'Lorem ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
//       },
//     ];
//     const mockPressedFn = jest.fn();

//     const {getByText} = render(
//       <ExpandableList data={data} toggle={mockPressedFn} />,
//     );
//     fireEvent.press(getByText('data'));
//     expect(mockPressedFn).toBeCalledWith(data);
//   });
// });

describe('Test for ExpandableList', () => {
  const data = [
    {
      id: 0,
      question: 'How can we schedule 1:1 sessions?',
      answer:
        'Lorem ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
    },
    {
      id: 1,
      question: 'How can I enter into group sessions?',
      answer:
        'Lorem ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
    },
    {
      id: 2,
      question: 'What are the refund policy?',
      answer:
        'Lorem ipsum dolor sit amet, consetetur elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.',
    },
  ];
  const mockPressedFn = jest.fn();
  const tree = render(<ExpandableList data={data} toggle={mockPressedFn} />);
  it('Render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('Render correctly', () => {
    const treeToJSON = tree.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
});
