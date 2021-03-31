const { exec } = require('./helper/exec');
const { FIXTURE } = require('./helper/fixtures');
const { green, yellow } = require('../src/report/render');
it('should specify test to run', () => {
  const stdout = exec(
    `hlj -t '^test 1$' -- ${FIXTURE}/specify-test-method.test.js`
  );
  expect(stdout).toContain('PASS');
  expect(stdout).toContain('test 1');
  expect(stdout).toContain(
    `Tests: ${yellow('1 skipped')}, ${green('1 passed')}, 2 total`
  );
});
