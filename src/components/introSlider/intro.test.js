import renderer from 'react-test-renderer';
import IntroSlider from './index';

test('Test intro slider', () => {
  const data = [
    {id: 1, name: 'First'},
    {id: 2, name: 'Second'},
    {id: 3, name: 'Third'},
  ];
  const tree = renderer.create(<IntroSlider data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});
