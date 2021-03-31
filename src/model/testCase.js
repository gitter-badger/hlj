const vm = require('vm');
const Status = require('./status');

class TestCase {
  constructor(name, callback) {
    this.name = name;
    this.callback = callback;
    this.status = new Status();
    this.expected = '';
    this.received = '';
  }

  getName() {
    return this.name;
  }

  getCallback() {
    return this.callback;
  }

  execute(testCaseName) {
    const startedAt = Date.now();

    if (!this.callback) {
      this.status.skip();
      return;
    }

    if (testCaseName && !this.name.includes(testCaseName)) {
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

  getExecutionTime() {
    return this.elapsed;
  }

  isPassed() {
    return this.status.isPassed();
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
}

module.exports = TestCase;
