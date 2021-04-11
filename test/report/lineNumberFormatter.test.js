const LineNumberFormatter = require('../../src/report/lineNumberFormatter');

describe('LineNumberFormatter', () => {
  it('should align numbers', () => {
    const result = new LineNumberFormatter().generateLineNumbers(8, 3);
    expect(result).toEqual([' 8', ' 9', '10']);
  });
});
