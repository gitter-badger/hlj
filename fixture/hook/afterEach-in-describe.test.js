describe('1', () => {
  let sum = 0;
  afterEach(() => {
    sum++;
  });

  it('sum = 0', () => {
    expect(sum).toBe(0);
  });

  it('sum = 1', () => {
    expect(sum).toBe(1);
  });

  it('sum = 2', () => {
    expect(sum).toBe(2);
  });
});

describe('2', () => {
  let sum = 0;
  afterEach(() => {
    sum += 2;
  });

  it('sum = 0', () => {
    expect(sum).toBe(0);
  });

  it('sum = 2', () => {
    expect(sum).toBe(2);
  });

  it('sum = 4', () => {
    expect(sum).toBe(4);
  });
});
