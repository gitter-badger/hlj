let sum = 0;

afterAll(() => {
  sum++;
  expect(sum).toBe(3);
});

it('sum = 1', () => {
  sum++;
  expect(sum).toBe(1);
});

it('sum = 2', () => {
  sum++;
  expect(sum).toBe(2);
});
