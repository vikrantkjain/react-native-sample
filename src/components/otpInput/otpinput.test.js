import {render, fireEvent, screen} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import OTPTextView from './otpFC';
describe('Test OTP input', () => {
  const onChangeTestMock = jest.fn();
  const treeJSON = renderer.create(
    <OTPTextView handleTextChange={onChangeTestMock} />,
  );
  render(<OTPTextView handleTextChange={onChangeTestMock} />);
  it('Render successfully', () => {
    expect(treeJSON).toBeDefined();
  });
  it('Render correctly', () => {
    const treeToJSON = treeJSON.toJSON();
    expect(treeToJSON).toMatchSnapshot();
  });
});
