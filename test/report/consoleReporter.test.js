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
    expect(stdout).toContain(`${getSuccessfulReport(
      TEST_RESULT.PASS
    )} 1 is equal to 1
  Keyword`);
  });

  it('should print error message', () => {
    const stdout = exec(`hlj ${FIXTURE}/failed.test.js`);
    expect(stdout).toContain(`${getFailedReport(
      TEST_RESULT.FAIL
    )} 1 is not equal 2
    Expected: ${getSuccessfulReport(2)}
    Received: ${getFailedReport(1)}`);
  });
});
