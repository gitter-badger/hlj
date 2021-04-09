const { underline, green } = require('./render');

class SourceCodeRender {
  constructor(code, testCase) {
    this.code = code;
    this.testCase = testCase;
  }

  render() {
    return this.code
      .split('\n')
      .map((line) => this.renderLine(line))
      .join('\n');
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
