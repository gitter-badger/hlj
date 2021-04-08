class Description {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.isSkipped = false;
    this.onlyRun = false;
  }

  getTotalTestCases() {
    return this.children.reduce((count, child) => {
      if (!child.children) {
        return count + 1;
      }
      return count + child.getTotalTestCases();
    }, 0);
  }
  skip() {
    this.children.forEach((child) => {
      child.skip();
    });
  }

  setOnlyRun() {
    this.onlyRun = true;
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
    if (this.isSkipped) {
      this.children.forEach((child) => {
        child.status.skip();
      });
    } else {
      const onlyRunTestCases = this.children.filter((child) => !!child.onlyRun);

      if (onlyRunTestCases.length > 0) {
        this.skipOthers();
        onlyRunTestCases.forEach((child) => {
          this.beforeEach && this.beforeEach();
          child.execute(testCaseName);
          this.afterEach && this.afterEach();
        });
      } else {
        this.children.forEach((child) => {
          this.beforeEach && this.beforeEach();
          child.execute(testCaseName);
          this.afterEach && this.afterEach();
        });
      }
    }
  }

  skipOthers() {
    this.children
      .filter((testCase) => {
        return !testCase.onlyRun;
      })
      .forEach((testCase) => {
        testCase.status.skip();
      });
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

  setBeforeEach(callback) {
    this.beforeEach = callback;
  }

  setAfterEach(callback) {
    this.afterEach = callback;
  }
}

module.exports = Description;
