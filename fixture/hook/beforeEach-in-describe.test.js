let i = 0;
beforeEach(() => {
  i++;
});

describe('1', () => {
  let sum = 0;
  beforeEach(() => {
    sum++;
  });

  it('sum = 1', () => {
    expect(sum).toBe(1);
  });

  it('sum = 2', () => {
    expect(sum).toBe(2);
  });

  it('sum = 3', () => {
    expect(sum).toBe(3);
  });

  it('i = 1', () => {
    expect(i).toBe(1);
  });
});

describe('2', () => {
  let sum = 0;
  beforeEach(() => {
    sum += 2;
  });

  it('sum = 2', () => {
    expect(sum).toBe(2);
  });

  it('sum = 4', () => {
    expect(sum).toBe(4);
  });

  it('sum = 6', () => {
    expect(sum).toBe(6);
  });

  describe('3', () => {
    let sum = 3;
    beforeEach(() => {
      sum--;
    });

    it('sum = 2', () => {
      expect(sum).toBe(2);
    });

    it('sum = 1', () => {
      expect(sum).toBe(1);
    });

    it('sum = 0', () => {
      expect(sum).toBe(0);
    });
  });

  it('i = 2', () => {
    expect(i).toBe(2);
  });
});
