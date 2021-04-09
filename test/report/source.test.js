const { exec } = require('../helper/exec');
const { FIXTURE } = require('../helper/fixtures');

describe('Source code', () => {
  it('show source code when test case failed', () => {
    const stdout = exec(`hlj ${FIXTURE}/source.test.js`);
    expect(stdout).toContain('FAIL');
    expect(stdout).toContain('1 is not equal 2');
    expect(stdout).toContain('expect(1).toBe(2);');
    expect(stdout).toContain('});');
  });
});
