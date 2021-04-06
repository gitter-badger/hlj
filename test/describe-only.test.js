const { exec } = require('./helper/exec');
const { green, yellow } = require('../src/report/render');
const { FIXTURE } = require('./helper/fixtures');

describe('Keyword', () => {
  it('should run it as test', function () {
    const stdout = exec(`hlj ${FIXTURE}/describe-only/fdescribe.test.js`);

    expect(stdout).toContain('PASS');
    expect(stdout).toContain(`Test Suites: ${green('1 passed')}, 1 total`);
    expect(stdout).toContain(`${yellow('1 skipped')}`);
    expect(stdout).toContain(`${green('2 passed')}, 3 total`);
  });
});
