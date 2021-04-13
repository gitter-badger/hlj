#!/usr/bin/env node
const fs = require('fs');
const Parser = require('./parser/parser');
const Walker = require('./walker');
const ConsoleReporter = require('./report/consoleReporter');
const ArgParser = require('./parser/argParser');
const { SHOW_LOGO } = require('./constant');

async function* gen() {
  while (true) {
    const key = yield;
    if (key === 'q') process.exit();
    if (key === 'a') {
      main(workingDir, argParser.getPath(), testCaseName, argParser.verbose());
    }
  }
}

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

if (argParser.watchMode()) {
  const g = gen();
  g.next();

  fs.watch(workingDir, { recursive: true }, async (eventType, fileName) => {

    const walker = new Walker();
    const isTestFile = walker.isTestFile(fileName);

    isTestFile ? main(
      workingDir,
      fileName,
      testCaseName,
      argParser.verbose()
    ) : await g.next('a');

  });

  var stdin = process.openStdin();

  stdin.on('data', async function (data) {
    const key = data.toString().trim();
    await g.next(key);
  });
}
module.exports = testReport;
