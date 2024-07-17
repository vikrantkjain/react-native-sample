import React from 'react';
import renderer from 'react-test-renderer';
import CountryPicker from './index';

jest.mock('react-native-config', () => 'RNConfig');

test('CountryPicker render correctly', () => {
  const tree = renderer
    .create(<CountryPicker placeholder="country picker" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
