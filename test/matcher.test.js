const { exec } = require('./helper/exec');
const { getSuccessfulReport, FIXTURE } = require('./helper/fixtures');

describe('Test Matcher', () => {
  describe('toBe', () => {
    it('PASS', () => {
      const stdout = exec(`hlj ${FIXTURE}/test-matcher.test.js`);
      expect(stdout).toContain('PASS');
    });

    it('FAIL', () => {
      const stdout = exec(`hlj ${FIXTURE}/matcher/toBe-fail.test.js`);
      expect(stdout).toContain('FAIL');
    });
  });

  describe('toEqual', () => {
    it('PASS', () => {
      const stdout = exec(`hlj ${FIXTURE}/test-matcher.test.js`);
      // todo: Object diff
      expect(stdout).toContain('PASS');
      expect(stdout).toContain(
        `Tests: ${getSuccessfulReport('3 passed')}, 3 total`
      );
    });

    it('FAIL', () => {
      const stdout = exec(`hlj ${FIXTURE}/matcher/toEqual-fail.test.js`);
      // todo: Object diff
      expect(stdout).toContain('FAIL');
    });
  });

  describe('toContain', () => {
    it('PASS', () => {
      const stdout = exec(`hlj ${FIXTURE}/toContain.test.js`);
      expect(stdout).toContain('PASS');
      expect(stdout).toContain(
        `Tests: ${getSuccessfulReport('2 passed')}, 2 total`
      );
    });

    it('FAIL', () => {});
  });

  describe('toMatch', () => {
    it('PASS', () => {
      const stdout = exec(`hlj ${FIXTURE}/toMatch.test.js`);
      expect(stdout).toContain('PASS');
      expect(stdout).toContain(
        `Tests: ${getSuccessfulReport('2 passed')}, 2 total`
      );
    });
  });
});
