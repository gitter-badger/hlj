#!/usr/bin/env node
const fs = require('fs');
const fileName = process.argv[2];
const testMethod = process.argv[3];
const { it, test, describe } = require('./core');

const { expect } = require('./matcher');
const { getTestResult } = require('./report');

const TestReport = require('./model/testReport.js');
const TestSuite = require('./model/testSuite.js');

const files = [];
const runTest = (path, testMethod, testReport) => {
  global.expect = expect;
  global.describe = describe;
  global.testMethod = testMethod;
  global.testReport = testReport;

  const fullPath = process.cwd() + '/' + path;
  requireTestFile(fullPath, testReport);

  //const report = new Parser().parse(files);
};

const requireTestFile = (path, testReport) => {
  if (isDir(path)) {
    const fileNames = fs.readdirSync(path);
    const testFiles = fileNames.filter((fileName) => isTestFile(fileName));
    testFiles.forEach((fileName) => {
      files.push(path + '/' + fileName);
    });

    const childDirs = fileNames.filter((fileName) => !fileName.endsWith('.js'));
    childDirs.forEach((dir) => {
      files.push(path + '/' + fileName);
    });
  } else {
    files.push(path);
  }
};

function isDir(fileName) {
  return fs.lstatSync(fileName).isDirectory();
}

const isTestFile = (fileName) => {
  return fileName.endsWith('.test.js');
};
const testReport = new TestReport();

const startAt = Date.now();
let isPassed;
let testMessage;
try {
  runTest(fileName, testMethod, testReport);
  isPassed = true;
} catch (e) {
  console.log(e);
  isPassed = false;
  testMessage = JSON.parse(e.message);
} finally {
  const executionTime = Date.now() - startAt;
  console.log(
    getTestResult(fileName, isPassed, testMessage, executionTime, testReport)
  );
}
