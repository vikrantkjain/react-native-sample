import React from 'react';
import List from '.';
import renderer from 'react-test-renderer';
import {View} from 'react-native';
describe('Test List component', () => {
  const tree = renderer.create(
    <List
      data={[1, 2]}
      renderItem={({item}) => {
        return <View />;
      }}
    />,
  );
  it('Renders correctly', () => {
    expect(tree).toBeDefined();
  });
  it('Render successfully', () => {
    const treeToJSON = tree.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
});
