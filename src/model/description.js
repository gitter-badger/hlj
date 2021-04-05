class Description {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.onlyRunIt = false;
  }

  getTotalTestCases() {
    return this.children.reduce((count, child) => {
      if (!child.children) {
        return count + 1;
      }
      return count + child.getTotalTestCases();
    }, 0);
  }
  setOnlyRunIt() {
    this.onlyRunIt = true;
  }

  setChildren(children) {
    this.children = children;
  }

  getName() {
    return this.name;
  }

  getFullName() {
    if (this.parent) {
      return this.parent.getFullName() + ' ' + this.name;
    }

    return this.name;
  }

  getChild(index) {
    return this.children[index];
  }

  execute(testCaseName) {
    this.children.forEach((child) => child.execute(testCaseName));
  }

  isPassed() {
    return this.children.every((child) => child.isPassed());
  }

  getPassedCount() {
    return this.children
      .map((child) => child.getPassedCount())
      .reduce((a, b) => a + b, 0);
  }

  getTotalCount() {
    return this.children
      .map((child) => child.getTotalCount())
      .reduce((a, b) => a + b, 0);
  }

  getSkippedCount() {
    return this.children
      .map((child) => child.getSkippedCount())
      .reduce((a, b) => a + b, 0);
  }
}

module.exports = Description;
