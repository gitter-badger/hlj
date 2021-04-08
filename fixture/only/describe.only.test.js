describe('Not run this describe ', () => {
  it('Not run case: should 1 equal to 1', function () {
    expect(1).toBe(2);
  });
});

describe('run it', () => {
  it('should 1 equal to 1', function () {
    expect(1).toBe(1);
  });
});

describe.only('run again', () => {
  it('should 1 equal to 1', () => {
    expect(1).toBe(1);
  });
});
