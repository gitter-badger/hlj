describe('fit', () => {
  it('Not run case: should 1 equal to 1', function () {
    expect(1).toBe(2);
  });

  fit('should 1 equal to 1', function () {
    expect(1).toBe(1);
  });

  fit('should 1 equal to 1', () => {
    expect(1).toBe(1);
  });
});
