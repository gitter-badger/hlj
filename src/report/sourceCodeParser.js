const fs = require('fs');

class SourceCodeParser {
  constructor(path, row) {
    this.content = fs.readFileSync(path, 'utf8').trim();
    this.codeLines = this.search(row);
    this.startLineNumber = Math.max(row - 2, 1);
  }

  search(row) {
    const lines = this.content.split('\n');
    return lines.splice(Math.max(row - 2 - 1, 0), 5);
  }

  getCodeLines() {
    return this.codeLines;
  }

  getStartLineNumber() {
    return this.startLineNumber;
  }
}

module.exports = SourceCodeParser;
