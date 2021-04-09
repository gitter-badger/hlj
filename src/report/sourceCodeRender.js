const { underline, green, blue } = require('./render');

class SourceCodeRender {
  constructor(code, startLineNumber, testCase, workingDir) {
    this.code = code;
    this.lineNumber = startLineNumber;
    this.testCase = testCase;
    this.workingDir = workingDir;
  }

  render() {
    const code = this.code
      .map((line) => this.lineNumber++ + ' |  ' + this.renderLine(line))
      .join('\n');
    return code + '\n\n' + this.position();
  }

  position() {
    return `at Object.<anonymous> (${blue(this.relativePath())}:${
      this.assertionLineNumber
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

    if (this.isAssertion(line)) {
      this.assertionLineNumber = this.lineNumber - 1;
      return line.substr(0, 2) + underline(line.trim());
    }

    return line;
  }

  isAssertion(line) {
    return (
      line.indexOf(this.testCase.getExpected()) > 0 &&
      line.indexOf(this.testCase.getReceived()) > 0
    );
  }
}

module.exports = SourceCodeRender;
