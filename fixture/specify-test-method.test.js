const sum = require('./sum');

test('test 1', () => {
  expect(1).toBe(1);
});

describe('Test Describe', () => {
  test('test 2', () => {
    expect(2).toBe(2);
  });

  test('test 3', () => {
    expect(3).toBe(3);
  });
});
