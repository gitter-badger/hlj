const { FIXTURE } = require('./helper/fixtures');
const { exec } = require('./helper/exec');
const { SHOW_LOGO } = require('../src/report/constant');

it('should print logo after startup when test dir', () => {
  const stdout = exec(`hlj ${FIXTURE}/`);
  expect(stdout).toContain(SHOW_LOGO());
});
