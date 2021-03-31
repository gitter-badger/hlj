class ArgParser {
  constructor(args) {
    this.args = args;
  }

  getPath() {
    return this.args[this.args.length - 1];
  }

  getTestCaseName() {
    const index1 = this.args.indexOf('-t');
    if (index1 === -1) return '';
    const index2 = this.args.indexOf('--');
    return this.args.slice(index1 + 1, index2).join(' ');
  }
}

module.exports = ArgParser;
