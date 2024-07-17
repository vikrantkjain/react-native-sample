import React from 'react';
import DatePicker from './index';
import {render} from '@testing-library/react-native';

const onDateChange = jest.fn();
// jest.mock('Platform', () => {
//   const Platform = require.requireActual('Platform');
//   Platform.OS = 'ios';
//   return Platform;
// });
describe('Test cases for date picker component', () => {
  const tree = render(
    <DatePicker date={new Date()} mode="date" onDateChange={onDateChange} />,
  );
  it('render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('render correctly', () => {
    const treeAsJSON = tree.toJSON();
    expect(treeAsJSON).toMatchSnapshot();
  });
});
