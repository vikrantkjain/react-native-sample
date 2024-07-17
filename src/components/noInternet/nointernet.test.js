import renderer from 'react-test-renderer';
import NetProvider from '../../contexts/NetworkProvider';

describe('Test NetProvider', () => {
  const tree = renderer.create(
    <NetProvider>
      <></>
    </NetProvider>,
  );
  it('Render successfully', () => {
    expect(tree).toBeDefined();
  });
  it('Render correctly', () => {
    const treeToJSON = tree.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
});
