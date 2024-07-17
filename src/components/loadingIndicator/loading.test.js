import renderer from 'react-test-renderer';
import LoadingIndicator from './index';

test('Test loadingIndicator', () => {
  const tree = renderer.create(<LoadingIndicator isLoading={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
