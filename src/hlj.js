#!/usr/bin/env node
const Parser = require('./parser/parser');
const Walker = require('./walker');
const ConsoleReporter = require('./report/consoleReporter');
const ArgParser = require('./parser/argParser');
const { SHOW_LOGO } = require('./constant');

const main = (fileName, testCaseName) => {
  const walker = new Walker();

  if (walker.isDir(fileName)) {
    console.log(`${SHOW_LOGO()}`);
  }

  const files = walker.walk(fileName);
  const testReport = new Parser().parse(files);

  testReport.execute(testCaseName);

  const consoleReport = new ConsoleReporter(process.cwd() + '/', testReport);

  const result = consoleReport.render();
  console.log(result);

  return consoleReport;
};

const argParser = new ArgParser(process.argv);
const fileName = process.cwd() + '/' + argParser.getPath();
const testCaseName = argParser.getTestCaseName();

const testReport = main(fileName, testCaseName);
module.exports = testReport;
