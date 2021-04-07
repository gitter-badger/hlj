const { exec } = require('./helper/exec');
const { green, yellow } = require('../src/report/render');
const { FIXTURE } = require('./helper/fixtures');

describe('only run fdescribe function in a suite', () => {
  it('should run it as test', function () {
    const stdout = exec(`hlj ${FIXTURE}/describe-only/fdescribe.test.js`);

    expect(stdout).toContain('PASS');
    expect(stdout).toContain(`Test Suites: ${green('1 passed')}, 1 total`);
    expect(stdout).toContain(`${yellow('1 skipped')}`);
    expect(stdout).toContain(`${green('2 passed')}, 3 total`);
  });
});

describe('only run fdescribe nested in a suite', () => {
  it('should return 1 skipped 2 passed and 3 total', () => {
    const stdout = exec(
      `hlj ${FIXTURE}/describe-only/fdescribe-nested.test.js`
    );

    expect(stdout).toContain('PASS');
    expect(stdout).toContain('2 skipped');
    expect(stdout).toContain('1 passed');
    expect(stdout).toContain('3 total');
  });
});

describe('describe.only', () => {
  it('should run describe.only and skip others ', () => {
    const stdout = exec(`hlj ${FIXTURE}/describe-only/describe.only.test.js`);

    expect(stdout).toContain('PASS');
    expect(stdout).toContain('2 skipped');
    expect(stdout).toContain('1 passed');
    expect(stdout).toContain('3 total');
  });
});

describe('fit nested', () => {
  it('should not skip describe contains fit test', () => {
    const stdout = exec(`hlj ${FIXTURE}/only/fit-describe.test.js`);

    expect(stdout).toContain('PASS');
    expect(stdout).toContain('1 skipped');
    expect(stdout).toContain('2 passed');
    expect(stdout).toContain('3 total');
  });
});
