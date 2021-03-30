const { exec } = require('./helper/exec');
const {
  getSuccessfulReport,
  getFailedReport,
  FIXTURE,
} = require('./helper/fixtures');
describe('JavaScript TDD framework', () => {
  it('is a CLI program', () => {
    const stdout = exec(`hlj ${FIXTURE}/sum.test.js`);
    expect(stdout).toContain('PASS');
  });
  it('should support console in test case', () => {
    const stdout = exec(`hlj ${FIXTURE}/console.test.js`);
    expect(stdout).toContain('output by console.log()');
  });
  it('should return PASS when test passed', () => {
    const stdout = exec(`hlj ${FIXTURE}/sum.test.js`);
    expect(stdout).toContain('PASS');
  });
  it('should return FAIL when test failed', () => {
    const stdout = exec(`hlj ${FIXTURE}/failed.test.js`);
    expect(stdout).toContain('FAIL');
  });
  describe('Test report', () => {
    it('should output number of tests passed', () => {
      const stdout = exec(`hlj ${FIXTURE}/two-tests.test.js`);
      expect(stdout).toContain(
        `Tests: ${getSuccessfulReport('2 passed')}, 2 total`
      );
    });
    it('should output number of tests passed while there are failed tests', () => {
      const stdout = exec(`hlj ${FIXTURE}/passed-and-failed.test.js`);
      expect(stdout).toContain(
        `Tests: ${getFailedReport('1 failed')}, ${getSuccessfulReport(
          '1 passed'
        )}, 2 total\n`
      );
    });

    it('should output execution time', () => {
      const stdout = exec(`hlj ${FIXTURE}/passed-and-failed.test.js`);
      const expectSuffix = /([0-9]*[.])?[0-9]+s/;
      const expectPrefix = /Time:/;

      expect(stdout).toMatch(expectPrefix);
      expect(stdout).toMatch(expectSuffix);
    });
  });
});
