test('should not to equal', () => {
  expect({ foo: 1 }).toEqual({ foo: 1 });
  expect({ foo: 1 }).toEqual({ foo: 1 });
  expect({ foo: 1 }).toEqual({ foo: 2 });
  expect({ foo: 1 }).toEqual({ foo: 1 });
  expect({ foo: 1 }).toEqual({ foo: 1 });
});
