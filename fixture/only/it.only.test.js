describe('fit', () => {
  it('Not run case: should 1 equal to 1', function () {
    expect(1).toBe(2);
  });

  it.only('should 1 equal to 1', function () {
    expect(1).toBe(1);
  });

  it.only('should 2 equal to 2', () => {
    expect(2).toBe(2);
  });
});
