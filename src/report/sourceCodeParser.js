const fs = require('fs');

class SourceCodeParser {
  read(path, testCaseName) {
    const code = fs.readFileSync(path, 'utf8');
    return this.search(code, testCaseName);
  }

  search(code, testCaseName) {
    const lines = code.split('\n');
    let start = false;
    const result = [];
    for (const line of lines) {
      if (line.indexOf(testCaseName) > 0) {
        start = true;
      }

      if (line.indexOf('})') > 0) {
        break;
      }

      if (start) {
        result.push(line);
      }
    }

    return result.join('\n');
  }
}

module.exports = SourceCodeParser;
