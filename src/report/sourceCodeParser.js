const fs = require('fs');

class SourceCodeParser {
  constructor(path, testCaseName) {
    this.content = fs.readFileSync(path, 'utf8').trim();
    this.codeLines = this.search(testCaseName);
  }

  search(testCaseName) {
    const lines = this.content.split('\n');
    let start = false;
    const result = [];
    let i = 0;
    for (const line of lines) {
      i++;
      if (line.indexOf(testCaseName) > 0) {
        start = true;
        this.startLineNumber = i;
      }

      if (line.indexOf('})') > 0) {
        break;
      }

      if (start) {
        result.push(line);
      }
    }

    return result;
  }

  getCodeLines() {
    return this.codeLines;
  }

  getStartLineNumber() {
    return this.startLineNumber;
  }
}

module.exports = SourceCodeParser;
