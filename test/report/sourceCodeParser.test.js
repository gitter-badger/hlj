const SourceCodeParser = require('../../src/report/sourceCodeParser');

describe('Source Code Parser', () => {
  it('should get the code lines 5 lines', () => {
    const filePath = process.cwd() + '/fixture/get-code-lines.test.js';
    const sourceCodeParser = new SourceCodeParser(filePath, 4);
    expect(sourceCodeParser.getCodeLines().length).toBe(5);
  });

  it('should get the code lines when the file is less than 5 lines', () => {
    const filePath = process.cwd() + '/fixture/matcher/toEqual-fail.test.js';
    const sourceCodeParser = new SourceCodeParser(filePath, 2);
    expect(sourceCodeParser.getCodeLines().length).toBe(3);
  });
});
