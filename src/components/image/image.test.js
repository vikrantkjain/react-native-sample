import React from 'react';
import renderer from 'react-test-renderer';
import Image from './index';
// import {Images} from '../../constants';

const url =
  'https://cdn.kinandcarta.com/-/media-assets/images/kincarta/insights/2022/02/react-native/react_hero.png?as=0&iar=0&w=1200&rev=61e1dad3af7e465e9544cf8490237772&hash=0AD31383BCBA1DA1C88546327312BA33';

jest.mock('react-native-config', () => 'RNConfig');
test('renders correctly', () => {
  const tree = renderer.create(<Image source={{uri: url}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
