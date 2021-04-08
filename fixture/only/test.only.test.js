describe('fit', () => {
  test('Not run case: should 1 equal to 1', function () {
    expect(1).toBe(2);
  });

  test.only('should 1 equal to 1', function () {
    expect(1).toBe(1);
  });
});

test.only('should 2 equal to 2', () => {
  expect(2).toBe(2);
});
