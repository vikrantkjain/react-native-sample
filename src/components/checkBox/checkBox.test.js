import React from 'react';
import renderer from 'react-test-renderer';
import CheckBox from './index';
import Images from '../../constants/Images';
test('CheckBox render correctly', () => {
  const tree = renderer
    .create(
      <CheckBox
        checkedImage={Images.ic_check}
        uncheckedImage={Images.ic_uncheck}
        checkedImageStyle={{
          backgroundColor: 'yellow',
        }}
        uncheckedImageStyle={{
          backgroundColor: 'red',
        }}
        style={{height: 10, width: 10}}>
        Hey
      </CheckBox>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
