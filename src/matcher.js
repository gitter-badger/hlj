function match({ matcher, isNot, actual, expected }) {
  const result = matcher(actual, expected);

  if (isNot && result) {
    throw new Error(JSON.stringify({ expected, received: actual }));
  }
  if (!result && !isNot) {
    throw new Error(JSON.stringify({ expected, received: actual }));
  }
}

const expect = (actual) => {
  return {
    ...createMatchers(false, actual),
    not: { ...createMatchers(true, actual) },
  };
};

const getToBe = (actual, expected) => {
  return actual === expected;
};

const getToEqual = (actual, expected) => {
  const isObject = typeof actual === 'object' && typeof expected === 'object';
  return isObject
    ? JSON.stringify(actual) === JSON.stringify(expected)
    : actual === expected;
};

const getToContain = (actual, expected) => {
  return actual.includes(expected);
};

const getToMatch = (actual, expected) => {
  return expected.test(actual);
};

const matcherMap = {
  toEqual: getToEqual,
  toBe: getToBe,
  toContain: getToContain,
  toMatch: getToMatch,
};

function createMatchers(isNot, actual) {
  return Object.keys(matcherMap)
    .map((key) => {
      const matcher = matcherMap[key];
      const fn = (expected) => match({ matcher, isNot, actual, expected });
      return { [key]: fn };
    })
    .reduce((result, obj) => {
      return { ...result, ...obj };
    }, {});
}

module.exports = {
  expect,
};
