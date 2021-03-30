const { TEST_RESULT } = require('../src/report/constant');
const { exec } = require('./helper/exec');
const {
  FIXTURE,
  getSuccessfulReport,
  getFailedReport,
} = require('./helper/fixtures');

describe('Test Suites', () => {
  it('should print Test Suites when test 1 test.js', function () {
    const stdout = exec(`hlj ${FIXTURE}/test-dir`);
    expect(stdout).toContain('PASS');
    expect(stdout).toContain(
      `Test Suites: ${getSuccessfulReport('2 passed')}, 2 total`
    );
    expect(stdout).toContain(
      `Tests: ${getSuccessfulReport('6 passed')}, 6 total`
    );
  });
  it('should print Test Suites when there are 2 test file', () => {
    const stdout = exec(`hlj ${FIXTURE}/suite-count/`);

    expect(stdout).toContain('PASS');
    expect(stdout).toContain(
      `Test Suites: ${getSuccessfulReport('2 passed')}, 2 total`
    );
  });

  it('should print 1 failed test and passed test in Test Suites when there is 1 failed and 1 passed test file', () => {
    const stdout = exec(`hlj ${FIXTURE}/suite-failed-count/`);

    expect(stdout).toContain(TEST_RESULT.FAIL);
    expect(stdout).toContain(
      `Test Suites: ${getFailedReport('1 failed')}, ${getSuccessfulReport(
        '1 passed'
      )}, 2 total`
    );
  });
});
