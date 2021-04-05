const { exec } = require('./helper/exec');
const { FIXTURE } = require('./helper/fixtures');

describe('Hook', () => {
  describe('beforeEach', () => {
    it('should run before each test case', () => {
      const stdout = exec(`hlj ${FIXTURE}/hook/beforeEach.test.js`);
      expect(stdout).toContain('PASS');
    });
  });

  describe('afterEach', () => {
    it('should run after each test case', () => {
      const stdout = exec(`hlj ${FIXTURE}/hook/afterEach.test.js`);
      expect(stdout).toContain('PASS');
    });
  });
});
