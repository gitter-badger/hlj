function match({ matcher, isNot, received, expected }) {
  const result = matcher(received)(expected);

  if (isNot && result) {
    throw new Error(JSON.stringify({ expected, received }));
  }
  if (!result && !isNot) {
    throw new Error(JSON.stringify({ expected, received }));
  }
}

const expect = (received) => {
  const matchers = (isNot = false) => ({
    toEqual: (expected) => {
      match({
        matcher: getToEqual,
        isNot,
        received,
        expected,
      });
    },
    toContain: getToContain(isNot)(received),
    toMatch: getToMatch(isNot)(received),
    toBe: (expected) => {
      match({
        matcher: getToBe,
        isNot,
        received,
        expected,
      });
    },
  });

  return {
    ...createMatchers(),
    not: { ...matchers(true) },
  };
};

const getToBe = (received) => (expected) => {
  return received === expected;
};

const getToEqual = (isNot) => (received) => (expected) => {
  const isObject = typeof received === 'object' && typeof expected === 'object';
  const condition = isObject
    ? JSON.stringify(received) !== JSON.stringify(expected)
    : received !== expected;

  return condition;
};

const getToContain = (isNot) => (received) => (expected) => {
  const contains = received.includes(expected);

  if (!contains && !isNot) {
    throw new Error(JSON.stringify({ expected, received }));
  }
};

const getToMatch = (isNot) => (received) => (expected) => {
  const contains = received.match(expected);

  if (!contains && !isNot) {
    throw new Error(JSON.stringify({ expected, received }));
  }
};

module.exports = {
  expect,
};

const matcherMap = {
  toEqual: getToEqual,
  toBe: getToBe,
  toContain: getToContain,
  toMatch: getToMatch,
};

function createMatchers() {
  return Object.keys(matcherMap)
    .map((key) => {
      const matcher = matcherMap[key];
      const fn = (isNot) => (expected) =>
        match({ matcher, isNot, received, expected });
      return { [key]: fn };
    })
    .reduce((result, obj) => {
      return { ...result, ...obj };
    }, {});
}
