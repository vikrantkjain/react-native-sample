import React from 'react';
import renderer from 'react-test-renderer';
import Divider from './index';

test('Divider render correctly', () => {
  const tree = renderer.create(<Divider />).toJSON();
  expect(tree).toMatchSnapshot();
});
