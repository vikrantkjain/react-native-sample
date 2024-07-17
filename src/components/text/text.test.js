import React from 'react';
import renderer from 'react-test-renderer';
import Text from './index';

test('render correctly', () => {
  const tree = renderer
    .create(<Text style={{color: '#fff'}}>Hello</Text>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
