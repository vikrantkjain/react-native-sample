import ToggleSwitch from './toggleSwitch';
import render from '@testing-library/react-native';
import renderer from 'react-test-renderer';

test('stop in the middle of animation', () => {
  const innerCircleTrackStyle = {off: 'red', on: '#fff'};
  const backgroundTrack = {off: '#fff', on: 'green'};

  const tree = renderer
    .create(
      <ToggleSwitch
        innerCircleTrack={innerCircleTrackStyle}
        backgroundTrack={backgroundTrack}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
