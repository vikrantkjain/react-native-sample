import React from 'react';
import renderer from 'react-test-renderer';
import Header from './index';

test('renders correctly', () => {
  const tree = renderer.create(<Header title="Test" type="home" />).toJSON();
  expect(tree).toMatchSnapshot();
});
