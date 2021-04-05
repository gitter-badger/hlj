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
