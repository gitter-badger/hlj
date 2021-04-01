const testReport = require('../src/hlj');
const { TEST_RESULT } = require('../src/constant');
if (!testReport.isPassed()) {
  process.exitCode = 1;
}
