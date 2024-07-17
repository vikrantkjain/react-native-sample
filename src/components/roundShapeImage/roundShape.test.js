import renderer from 'react-test-renderer';
import RoundShapeImage from './index';

test('Test round image', () => {
  const tree = renderer
    .create(
      <RoundShapeImage
        height={100}
        imageUrl={{uri: 'https://picsum.photos/200/300'}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
