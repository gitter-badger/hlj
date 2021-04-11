const { exec } = require('./helper/exec');
const { FIXTURE } = require('./helper/fixtures');

describe('Statistics Test Result', () => {
  it('show test suit result should not print 0 pass when all the test are failed', () => {
    const stdout = exec(`hlj ${FIXTURE}/failed.test.js`);
    expect(stdout).toContain('FAIL');
    expect(stdout).toContain('1 is not equal 2');
    expect(stdout).toContain('expect(1).toBe(2);');
    expect(stdout).toContain('});');
    expect(stdout).not.toContain('0 pass');
    expect(stdout).toContain('1 total');
  });
});
