#!/usr/bin/env node
const Parser = require('./parser/parser');
const Walker = require('./walker');
const ConsoleReporter = require('./report/consoleReporter');
const ArgParser = require('./parser/argParser');

const main = (fileName, testCaseName) => {
  const files = new Walker().walk(fileName);
  const testReport = new Parser().parse(files);

  testReport.execute(testCaseName);

  const result = new ConsoleReporter(process.cwd() + '/', testReport).render();
  console.log(result);
};

const argParser = new ArgParser(process.argv);
const fileName = process.cwd() + '/' + argParser.getPath();
const testCaseName = argParser.getTestCaseName();

main(fileName, testCaseName);
