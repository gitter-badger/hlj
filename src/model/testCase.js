const Status = require('./status');

class TestCase {
  constructor(suite, name, callback) {
    this.name = name;
    this.callback = callback;
    this.status = new Status();
    this.expected = '';
    this.received = '';
    this.onlyRun = false;
    this.suite = suite;
  }

  getName() {
    return this.name;
  }

  getCallback() {
    return this.callback;
  }

  execute(testCaseName) {
    if (this.isSkipped()) return;
    const startedAt = Date.now();

    if (!this.callback) {
      this.status.skip();
      return;
    }

    const regExp = new RegExp(this.removeQuote(testCaseName));
    if (testCaseName && !regExp.test(this.getFullName())) {
      this.status.skip();
      return;
    }

    try {
      this.callback();
      this.status.pass();
    } catch (e) {
      try {
        const { expected, received } = JSON.parse(e.message);
        this.expected = expected;
        this.received = received;
      } catch (e1) {
        this.received = e.stack;
      } finally {
        this.status.fail();
      }
    }

    this.elapsed = Date.now() - startedAt;
  }

  removeQuote(regExText) {
    return regExText.slice(1, regExText.length - 2);
  }

  getFullName() {
    if (this.parent) {
      return this.parent.getFullName() + ' ' + this.name;
    }

    return this.name;
  }

  getExecutionTime() {
    return this.elapsed;
  }

  isPassed() {
    return this.status.isPassed();
  }

  isSkipped() {
    return this.status.isSkipped();
  }

  getStatus() {
    return this.status;
  }

  getFailedCount() {
    return this.status.isFailed() ? 1 : 0;
  }

  getPassedCount() {
    return this.status.isPassed() ? 1 : 0;
  }

  getSkippedCount() {
    return this.status.isSkipped() ? 1 : 0;
  }

  getTotalCount() {
    return 1;
  }

  getExpected() {
    return this.expected;
  }

  getReceived() {
    return this.received;
  }

  setOnlyRun() {
    this.onlyRun = true;
  }

  skip() {
    if (!this.onlyRun) {
      this.status.skip();
    }
  }

  getSuite() {
    return this.suite;
  }
}

module.exports = TestCase;
