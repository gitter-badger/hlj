const { exec } = require('../helper/exec');
const {
  FIXTURE,
  getSuccessfulReport,
  getFailedReport,
  TEST_RESULT,
} = require('../helper/fixtures');

describe('Console Reporter', () => {
  it('should print nested describes', () => {
    const stdout = exec(`hlj ${FIXTURE}/really-complex.test.js`);
    expect(stdout).toContain('Keyword');
    expect(stdout).toContain('Keyword 2');
    expect(stdout).toContain('Keyword 3');
    expect(stdout).toContain('Keyword 4');
  });

  it('should print error message', () => {
    const stdout = exec(`hlj ${FIXTURE}/failed.test.js`);
    expect(stdout).toContain(
      `${getFailedReport(TEST_RESULT.FAIL)} 1 is not equal 2`
    );
    expect(stdout).toContain(`  Expected: ${getSuccessfulReport(2)}`);
    expect(stdout).toContain(`  Received: ${getFailedReport(1)}`);
  });

  it('should print execution time of each test case', () => {
    const stdout = exec(`hlj ${FIXTURE}/really-complex.test.js`);
    expect(stdout).toMatch(/\d+ ms/);
  });

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
