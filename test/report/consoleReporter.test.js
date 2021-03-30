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
});
