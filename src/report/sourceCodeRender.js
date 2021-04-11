const { underline, green, blue } = require('./render');

class SourceCodeRender {
  constructor(code, startLineNumber, testCase, workingDir) {
    this.code = code;
    this.lineNumber = startLineNumber;
    this.testCase = testCase;
    this.workingDir = workingDir;
    this.failPosition = testCase.getFailPosition();
  }

  render() {
    const code = this.code
      .map((line) => this.lineNumber++ + ' |  ' + this.renderLine(line))
      .join('\n');
    return code + '\n\n' + this.position();
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
