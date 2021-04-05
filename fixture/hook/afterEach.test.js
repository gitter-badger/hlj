let sum = 3;

afterEach(() => {
  sum--;
});

it('sum = 3', () => {
  expect(sum).toBe(3);
});

it('sum = 2', () => {
  expect(sum).toBe(2);
});

it('sum = 1', () => {
  expect(sum).toBe(1);
});
