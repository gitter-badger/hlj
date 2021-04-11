const { exec } = require('../helper/exec');
const { FIXTURE } = require('../helper/fixtures');

describe('Source code', () => {
  it('show source code when test case failed', () => {
    const stdout = exec(`hlj ${FIXTURE}/source.test.js`);
    expect(stdout).toContain('FAIL');
    expect(stdout).toContain('1 is not equal 2');
    expect(stdout).toContain('expect(1).toBe(2);');
    expect(stdout).toContain('});');
  });

  it('should not show other test case code', () => {
    const stdout = exec(`hlj ${FIXTURE}/long-source.test.js`);
    expect(stdout).toContain('FAIL');
    expect(stdout).not.toContain('expect(1).toBe(1)');
    expect(stdout).toContain('1 is not equal 2');
    expect(stdout).toContain('expect(1).toBe(2);');
    expect(stdout).toContain('});');
  });

  it('should show line number', () => {
    const stdout = exec(`hlj ${FIXTURE}/long-source.test.js`);
    expect(stdout).toContain('FAIL');
    expect(stdout).toContain('5 | ');
    expect(stdout).toContain('6 | ');
    expect(stdout).toContain('7 | ');
  });

  it('should show the path of failed suite', () => {
    const stdout = exec(`hlj ${FIXTURE}/long-source.test.js`);
    expect(stdout).toContain('FAIL');
    expect(stdout).toContain('at Object.<anonymous> (');
    expect(stdout).toContain(':6');
  });

  it('should highlight the line where match failed', () => {
    const stdout = exec(`hlj ${FIXTURE}/long-source.test.js`);
    expect(stdout).toContain('FAIL');
    expect(stdout).toContain('> 6 | ');
  });
});
