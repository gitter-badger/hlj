const fs = require('fs');
class SourceCodeParser {
  read(path) {
    return fs.readFileSync(path, 'utf8');
  }
}

module.exports = SourceCodeParser;
