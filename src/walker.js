const fs = require('fs');
const { sep } = require('path');

class Walker {
  constructor() {
    this.files = [];
  }

  walk(path) {
    if (this.isTestFile(path)) {
      this.files.push(path);
      return this.files;
    }

    if (this.isDir(path)) {
      const completedPath = path.endsWith(sep) ? path : path + sep;
      const fileNames = fs.readdirSync(path);
      fileNames.forEach((fileName) => {
        this.walk(completedPath + fileName);
      });
    }
    return this.files;
  }

  isDir(fileName) {
    return fs.lstatSync(fileName).isDirectory();
  }

  isTestFile(fileName) {
    return fileName.endsWith('.test.js');
  }
}

module.exports = Walker;
