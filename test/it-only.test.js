const { exec } = require('./helper/exec');
const { green, yellow } = require('../src/report/render');
const { FIXTURE } = require('./helper/fixtures');

describe('fit', () => {
  it('should run it and skip others in the same suite', function () {
    const stdout = exec(`hlj ${FIXTURE}/only/fit.test.js`);

    expect(stdout).toContain('PASS');
    expect(stdout).toContain(`Test Suites: ${green('1 passed')}, 1 total`);
    expect(stdout).toContain(`${yellow('1 skipped')}`);
    expect(stdout).toContain(`${green('2 passed')}, 3 total`);
  });
});
