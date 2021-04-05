const { exec } = require('./helper/exec');
const { FIXTURE } = require('./helper/fixtures');

describe('Not run this describe ', () => {
  it('should 1 equal to 1', function () {
    expect(1).toBe(1);
  });
});
fdescribe('run it', () => {
  it('should skip test', function () {
    const stdout = exec(`hlj ${FIXTURE}/skipped.test.js`);
    expect(stdout).toContain('PASS');
    expect(stdout).toContain('1 skipped');
    expect(stdout).toContain('1 total');
  });
});
