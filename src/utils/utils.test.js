import {ratingCount, initialRating_} from './Util';

describe('Test ratingCount function', () => {
  test('passing single digit rating ', () => {
    expect(ratingCount(1)).toBe(1);
  });
  test('passing float value', () => {
    expect(ratingCount(2.4)).toBeCloseTo(2.5);
  });
  test('passing float value to get half', () => {
    expect(ratingCount(4.5)).toBe(4.5);
  });
  test('pass undefined or null or blank string', () => {
    expect(ratingCount('')).toBe(0);
  });
});

describe('Test initialRating function', () => {
  test('Passing float value as initial value', () => {
    expect(initialRating_(2.5, 40, 5, 5)).toBe(110);
  });
  test('Passing int value as initial value', () => {
    expect(initialRating_(4, 40, 8, 10)).toBe(192);
  });
});
