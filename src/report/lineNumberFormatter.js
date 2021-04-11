class LineNumberFormatter {
  generateLineNumbers(startLineNumber, count) {
    const lineNumbers = this.generate(startLineNumber, count);
    return this.format(lineNumbers);
  }

  generate(startLineNumber, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(startLineNumber + i);
    }
    return result;
  }

  format(numbers) {
    const maxLength = this.lengthOf(numbers[numbers.length - 1]);
    return numbers.map(
      (number) => this.fillBlanks(maxLength - this.lengthOf(number)) + number
    );
  }

  lengthOf(number) {
    return number.toString().length;
  }

  fillBlanks(length) {
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(' ');
    }
    return result.join('');
  }
}

module.exports = LineNumberFormatter;
