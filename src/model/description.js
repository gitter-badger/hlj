class Description {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  getTotalTestCases() {
    return this.children.reduce((count, child) => {
      if (!child.children) {
        return count + 1;
      }
      return count + child.getTotalTestCases();
    }, 0);
  }

  setChildren(children) {
    this.children = children;
  }

  getName() {
    return this.name;
  }

  getChild(index) {
    return this.children[index];
  }

  execute() {
    this.children.forEach((child) => child.execute());
  }
}

module.exports = Description;
