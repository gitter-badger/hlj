const { exec } = require('./helper/exec');
const { FIXTURE } = require('./helper/fixtures');
const { green, yellow } = require('../src/report/render');
it('should specify test to run', () => {
  const stdout = exec(
    `hlj -t "'test 1$'" -- ${FIXTURE}/specify-test-method.test.js`
  );
  expect(stdout).toContain('PASS');
  expect(stdout).toContain('test 1');
  expect(stdout).toContain(
    `Tests: ${yellow('2 skipped')}, ${green('1 passed')}, 3 total`
  );
});

it('should specify test in describe to run', () => {
  const stdout = exec(
    `hlj -t "'^Test Describe test 2$'" -- ${FIXTURE}/specify-test-method.test.js`
  );
  expect(stdout).toContain('PASS');
  expect(stdout).toContain('test 2');
  expect(stdout).toContain(
    `Tests: ${yellow('2 skipped')}, ${green('1 passed')}, 3 total`
  );
});
