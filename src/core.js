const Description = require('./model/description');
const TestCase = require('./model/testCase');

let passedCount = 0;
let totalCount = 0;
let skippedCount = 0;
let testCaseResults = [];

const describe = (name, callback) => {
  const description = new Description(name);
  global.testReport.addDescription(description);
  callback();
};
const it = (name, callback) => {
  test(name, callback);
};
const test = (name, callback) => {
  const testCase = new TestCase(name);
  global.testReport.addTestCase(testCase);
  if (global.testMethod && name !== global.testMethod) {
    return;
  }
  totalCount++;
  try {
    callback();
    testCaseResults.push({ name, isPassed: true });
    passedCount++;
  } catch (e) {
    testCaseResults.push({ name, isPassed: false });
    throw e;
  }
};

Object.defineProperty(test, 'skip', {
  value: (name, callback) => {
    skip(name, callback);
  },
  writable: true,
});

const skip = (name, callback) => {
  skippedCount++;
  totalCount++;
};

const getPassedCount = () => {
  return passedCount;
};

const getSkippedCount = () => {
  return skippedCount;
};

const getFailedCount = () => {
  return totalCount - passedCount - skippedCount;
};

const getTotalCount = () => {
  return totalCount;
};

const getTestCaseResults = () => {
  return testCaseResults;
};

module.exports = {
  it,
  test,
  describe,
  getPassedCount,
  getSkippedCount,
  getFailedCount,
  getTotalCount,
  getTestCaseResults,
  skip,
};
