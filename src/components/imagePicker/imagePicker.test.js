import MediaPicker from './mediaPicker';
import {Pressable} from 'react-native';
import renderer from 'react-test-renderer';

jest.mock('react-native-image-crop-picker', () => 'ImagePicker');
jest.mock('react-native-config', () => 'RNConfig');
describe('Test for MediaPicker', () => {
  const tree = renderer.create(
    <MediaPicker>
      <Pressable
        onPress={() => {
          ref.current.singlePhoto();
        }}
        testID="TEST-01"></Pressable>
    </MediaPicker>,
  );

  it('Render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('Render correctly', () => {
    const treeToJSON = tree.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
});
