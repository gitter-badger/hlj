#!/usr/bin/env node
const Parser = require('./parser/parser');
const Walker = require('./walker');
const ConsoleReporter = require('./report/consoleReporter');
const ArgParser = require('./parser/argParser');
const { SHOW_LOGO } = require('./constant');

const main = (workingDir, fileName, testCaseName, verbose) => {
  const fullPath = workingDir + fileName;
  const walker = new Walker();

  if (walker.isDir(fullPath)) {
    console.log(`${SHOW_LOGO()}`);
  }

  const files = walker.walk(fullPath);
  const testReport = new Parser().parse(files);

  testReport.execute(testCaseName);

  const consoleReport = new ConsoleReporter(workingDir, testReport, verbose);

  const result = consoleReport.render();
  console.log(result);

  return consoleReport;
};

const argParser = new ArgParser(process.argv);
const workingDir = process.cwd() + '/';
const testCaseName = argParser.getTestCaseName();

const testReport = main(
  workingDir,
  argParser.getPath(),
  testCaseName,
  argParser.verbose()
);
module.exports = testReport;
