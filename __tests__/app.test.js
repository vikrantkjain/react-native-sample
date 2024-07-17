/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });
// global.fetch = jest.fn(() => new Promise(resolve => resolve()));
// jest.mock('react-native-gesture-handler', () => {});
it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
// describe('TEST App.tsx', () => {
//   const tree = renderer.create(<App />);
//   it('Render correctly', async () => {
//     expect(tree).toBeDefined();
//   });
//   it('Render successfully', async () => {
//     const treeToJSON = tree.toJSON();
//     expect(treeToJSON).toMatchSnapshot();
//   });
// });
