#!/usr/bin/env node
const fs = require('fs');
const { sep } = require('path');
const Parser = require('./parser/parser');
const Walker = require('./walker');
const ConsoleReporter = require('./report/consoleReporter');
const ArgParser = require('./parser/argParser');
const { SHOW_LOGO } = require('./constant');

const handleCommand = async (key, fileName) => {
  if (key === 'q') process.exit();
  if (key === 'a') {
    main(workingDir, argParser.getPath(), testCaseName, argParser.verbose());
  }
  if (key === 'o') {
    main(workingDir, fileName, testCaseName, argParser.verbose());
  }
};

async function* gen() {
  while (true) {
    const key = yield;
    await handleCommand(key);
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
const workingDir = process.cwd() + sep;
const testCaseName = argParser.getTestCaseName();

const testReport = main(
  workingDir,
  argParser.getPath(),
  testCaseName,
  argParser.verbose()
);

const flushScreen = () => {
  console.log('\x1Bc');
};

if (argParser.watchMode()) {
  const g = gen();
  g.next();

  fs.watch(workingDir, { recursive: true }, async (eventType, fileName) => {
    flushScreen();
    const walker = new Walker();
    const isTestFile = walker.isTestFile(fileName);

    isTestFile ? await handleCommand('o') : await handleCommand('a');
  });

  var stdin = process.openStdin();

  stdin.on('data', async function (data) {
    flushScreen();
    const key = data.toString().trim();
    await g.next(key);
  });
}
module.exports = testReport;
