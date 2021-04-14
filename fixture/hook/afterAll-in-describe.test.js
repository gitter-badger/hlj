describe('1', () => {
  let sum = 0;
  afterAll(() => {
    sum++;
  });

  it('sum = 0', () => {
    expect(sum).toBe(0);
  });
});

describe('2', () => {
  let sum = 0;
  afterAll(() => {
    sum += 2;
  });

  it('sum = 0', () => {
    expect(sum).toBe(0);
  });
});
