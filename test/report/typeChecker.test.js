const TypeChecker = require('../../src/report/typeChecker');

const lines = `\x1B[42m PASS \x1B[0m fixture/nested-describes.test.js
Keyword
Keyword 1
\x1B[32m✓\x1B[0m 1 is equal to 1
Keyword 2
\x1B[32m✓\x1B[0m 2 is equal to 2
\x1B[42m PASS \x1B[0m fixture/nested-describes.test.js
Keyword 1
\x1B[32m✓\x1B[0m 1 is equal to 1
`.split('\n');

describe('TypeChecker', () => {
  it('should check describe start', () => {
    const typeChecker = new TypeChecker(lines);
    expect(typeChecker.isDescribeStart(1)).toBe(true);
    expect(typeChecker.isDescribeStart(2)).toBe(true);
  });

  it('should check describe end', () => {
    const typeChecker = new TypeChecker(lines);
    expect(typeChecker.isDescribeEnd(4)).toBe(true);
  });

  it('should check test case start', () => {
    const typeChecker = new TypeChecker(lines);
    expect(typeChecker.isTestCaseStart(3)).toBe(true);
  });

  it('should check suite start', () => {
    const typeChecker = new TypeChecker(lines);
    expect(typeChecker.isSuiteStart(6)).toBe(true);
  });
});
