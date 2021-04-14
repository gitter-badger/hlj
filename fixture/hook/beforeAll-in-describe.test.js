describe('1', () => {
  let sum = 0;
  beforeAll(() => {
    sum++;
  });

  it('sum = 1', () => {
    expect(sum).toBe(1);
  });
});

describe('2', () => {
  let sum = 0;
  beforeAll(() => {
    sum += 2;
  });

  it('sum = 0', () => {
    expect(sum).toBe(2);
  });

  describe('3', () => {
    let sum = 3;
    beforeAll(() => {
      sum--;
    });

    it('sum = 2', () => {
      expect(sum).toBe(2);
    });
  });
});
