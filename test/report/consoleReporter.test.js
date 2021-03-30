const { exec } = require('../helper/exec');
const { FIXTURE } = require('../helper/fixtures');

describe('Console Reporter', () => {
  it('should print nested describes', () => {
    const stdout = exec(`hlj ${FIXTURE}/really-complex.test.js`);
    expect(stdout).toContain(`✓ 1 is equal to 1
Keyword
  Keyword 2
    ✓ 2 is equal to 2
    ✓ 3 is equal to 3
  Keyword 3
    ✓ 5 is equal to 5
  Keyword 4
    ✓ 4 is equal to 4`);
  });

  it('should print error message', () => {
    const stdout = exec(`hlj ${FIXTURE}/failed.test.js`);
    expect(stdout).toContain(`x 1 is not equal 2
  Expected: 2
  Received: 1`);
  });
});
