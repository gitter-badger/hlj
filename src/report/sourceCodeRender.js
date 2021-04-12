const { underline, green, blue, red } = require('./render');

const LineNumberFormatter = require('./lineNumberFormatter');

class SourceCodeRender {
  constructor(code, startLineNumber, testCase, workingDir) {
    this.code = code;
    this.startLineNumber = startLineNumber;
    this.testCase = testCase;
    this.workingDir = workingDir;
    this.failPosition = testCase.getFailPosition();
  }

  render() {
    const lineNumbers = new LineNumberFormatter().generateLineNumbers(
      this.startLineNumber,
      this.code.length
    );
    let failedRowIndex = this.failPosition.row - this.startLineNumber;
    lineNumbers.splice(
      failedRowIndex + 1,
      0,
      new LineNumberFormatter().fillBlanks(lineNumbers[0].length)
    );
    this.insertFailColumnMarker(this.code, failedRowIndex + 1);
    const lineNumberAdded = this.code.map(
      (line, index) =>
        '  ' + lineNumbers[index] + ' |  ' + this.renderLine(line)
    );
    lineNumberAdded[failedRowIndex] = lineNumberAdded[failedRowIndex].replace(
      ' ',
      red('>')
    );
    return lineNumberAdded.join('\n') + '\n\n' + this.position();
  }

  insertFailColumnMarker(codes, index) {
    codes.splice(index, 0, this.columnMarker());
  }

  columnMarker() {
    return (
      new LineNumberFormatter().fillBlanks(this.failPosition.col - 1) + red('^')
    );
  }

  position() {
    return `at Object.<anonymous> (${blue(this.relativePath())}:${
      this.failPosition.row
    })`;
  }

  relativePath() {
    return this.testCase.getSuite().getPath().replace(this.workingDir, '');
  }

  renderLine(line) {
    const index = line.indexOf(this.testCase.getName());
    if (index > 0) {
      return (
        line.substr(0, index) +
        green(this.testCase.getName()) +
        line.substr(index + this.testCase.getName().length)
      );
    }

    if (this.failPosition.row === this.lineNumber - 1) {
      return line.substr(0, 2) + underline(line.trim());
    }

    return line;
  }
}

module.exports = SourceCodeRender;
