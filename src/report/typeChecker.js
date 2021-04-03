const { TEST_RESULT_ICON, COLOR_SCHEMA } = require('./constant');

class TypeChecker {
  constructor(lines) {
    this.lines = lines;
  }

  isDescribeStart(i) {
    return (
      this.isDescribe(i) && (this.isDescribe(i - 1) || this.isSuite(i - 1))
    );
  }

  isDescribeEnd(i) {
    return this.isDescribe(i) && this.isTestCase(i - 1);
  }

  isTestCaseStart(i) {
    return this.isTestCase(i) && !this.isTestCase(i - 1);
  }

  isSuiteStart(i) {
    return (
      this.lines[i].startsWith(COLOR_SCHEMA.redBG) ||
      this.lines[i].startsWith(COLOR_SCHEMA.greenBG)
    );
  }

  isSuite(i) {
    return i === 0;
  }

  isDescribe(i) {
    return !this.isTestCase(i) && !this.isExpected(i) && !this.isReceived(i);
  }

  isReceived(i) {
    return this.lines[i].startsWith('Received:');
  }

  isExpected(i) {
    return this.lines[i].startsWith(`Expected: `);
  }

  isTestCase(i) {
    return this.lines[i].startsWith(`\x1B[32m${TEST_RESULT_ICON.PASS}`);
  }
}

module.exports = TypeChecker;
