const { exec } = require('../helper/exec');
const { FIXTURE } = require('../helper/fixtures');

describe('Verbose', () => {
  describe('--verbose', () => {
    it('print details', () => {
      const stdout = exec(`hlj ${FIXTURE}/verbose/pass --verbose`);
      expect(stdout).toContain('1 plus 1 is not 3');
    });
  });

  describe('no --verbose', () => {
    describe('test pass', () => {
      it('print details when run single suite', () => {
        const stdout = exec(`hlj ${FIXTURE}/verbose/sum.test.js`);
        expect(stdout).toContain('1 plus 1 is not 3');
      });

      it('print brief when run multiple suites', () => {
        const stdout = exec(`hlj ${FIXTURE}/verbose/pass`);
        expect(stdout).toContain('fixture/verbose/pass/test-matcher-2.test.js');
        expect(stdout).toContain('fixture/verbose/pass/test-matcher.test.js');
        expect(stdout).not.toContain('1 plus 1 is not 3');
      });
    });

    describe('test failed', () => {
      it('print details', () => {
        const stdout = exec(`hlj ${FIXTURE}/verbose/failed`);
        expect(stdout).toContain(`2 plus 2 is not 5`);
      });
    });
  });
});
