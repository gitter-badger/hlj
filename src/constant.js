const BLANK_SPACE = ' ';

const COLOR_SCHEMA = {
  black: '\x1B[30',
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  redBG: '\x1B[41m',
  greenBG: '\x1B[42m',
  yellowBG: '\x1B[43m',
  reset: '\x1B[0m',
};

const FONT_STYLE = {
  bold: '\x1B[1m',
  underline: '\x1B[4m',
};

const TEST_RESULT_ICON = {
  PASS: '✓',
  FAIL: 'x',
  SKIP: '○',
};
const TEST_RESULT_TEXT = {
  PASS: 'PASS',
  FAIL: 'FAIL',
  SKIP: 'SKIP',
};
const TEST_RESULT_STATUS = {
  PASSED: 'passed',
  FAILED: 'failed',
  SKIPPED: 'skipped',
};

const SHOW_LOGO = () => {
  return (
    `⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠉⠈⠉⠛⠁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠙⠉⠉⣿⠉⠉⣙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠉⠉⠉⠉⠉⠛⣩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠀⣰⣿⣿⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠉⠙⠙⠙⠙⣿⣿⣿⣩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠉⠉⠉⠉⠉⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠀⣴⡿⠀⣼⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠉⠙⠙⠉⠉⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠉⠉⠉⠉⠉⣹⣩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣦⣤⠆⠀⣾⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⣿⣿⣿⣷⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠉⣿⣷⣷⣿⣿⠛⠉⠉⠉⣿⣿⣿⣿⠙⠛⠉⠉⠉⢿⣿⡿⠛⠻⣿⣿⣿
⣿⣿⣿⣿⠟⠁⠀⠋⠉⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠉⠉⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠉⠈⠉⠻⣿⣿⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠉⣿⡿⣏⠙⠉⠉⠉⠹⣿⣿⣿
⣿⣿⣿⣿⣷⣶⡿⠟⠛⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⢨⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠉⠉⠉⠉⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠙⠉⣉⠙⡙⠙⣿⣿
⣿⣿⣿⣿⣤⣤⣶⣶⣿⣧⣤⣤⣤⣤⣤⣤⣤⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠙⠉⠿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠛⣿⣿⣿⣿⣿⠋⠉⢉⠉⠉⢿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠉⠀⠀⠀⠀⠐⠟⢠⣿⣿⣿⣿⣿⠟⠉⠉⣉⣤⣤⣭⠙⠛⣿⣿⠉⠉⠉⠉⣉⣽⣿⢻⣿⡟⠉⠉⠉⠉⣉⣭⣭⡽⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡟⠛⣿⣿⣿⣿⣿⣿⡟⠛⢿⣿⣿⣿⣟⡝⡇⠀⠀⠀⠈⠈⠻⣷⣿⣿⣿⣿⣿⣿⣿⣿⠙⣽⣿⣿⣯⠝⠙⠙⠁⠉⠉⣿⣿⢽⣿⣿⣿⣿⣿⣽⣿⠉⢻⣿⣿⣿⣿⠉⠉⠙⣿⣿⣿⣿⠛⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠛⠀⣶⠀⠻⣶⣴⣴⠀⣴⣴⣴⣿⣿⣿⣿⣿⠙⣿⣄⠀⠀⠀⠀⠀⠉⢻⣿⣿⣿⡟⠋⡏⠉⠙⠉⠉⠉⠉⠉⠙⡍⠉⠙⠉⣹⠿⠛⠉⣿⣿⡟⠛⠛⠉⠉⠉⠛⠉⠉⠉⠈⠙⢻⣿⠛⡟⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠀⣰⣏⠈⢿⣄⣞⠀⣀⣄⣀⠀⠀⠿⠿⠛⠛⢻⠉⠁⠀⠉⠛⠉⠀⠀⠀⣿⣿⣿⣿⠉⣿⣭⣽⣿⣟⠉⡉⠉⠉⠙⡏⠈⠉⠉⠉⢉⣿⠿⣿⣿⡏⠉⠿⠟⠛⢿⣍⡉⠉⠉⠉⠙⣿⣟⠉⣹⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠛⠛⠓⠛⠛⣿⠀⣿⠀⢸⡇⠀⣿⣿⣿⣿⣿⣏⠁⠀⠀⠈⠉⠉⠀⠟⠛⣿⣿⣿⣿⣿⣿⣿⣾⢿⣿⣿⣽⡿⣿⣿⠉⠙⠉⠸⠉⠈⣽⣻⣿⣿⡏⣿⣿⠿⠛⠿⠙⣙⣝⣉⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡿⠁⣴⣿⠀⣿⠀⣼⡇⠀⣿⣿⣿⣿⣿⣿⡉⠀⠀⠀⠀⠀⠉⠁⠉⠈⠿⣿⣿⣿⡟⠉⠉⣹⣿⣿⣿⣿⣿⣿⡍⠉⠉⠉⠉⢨⣿⣿⣹⣿⣿⣯⣉⣈⣭⣽⣿⣿⣿⣿⡿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣶⡀⠀⢾⣿⣿⡶⠁⢀⡉⠉⢿⣿⣿⣿⣿⣿⣿⣿⡅⠀⠀⠈⠉⠀⠀⠀⠉⠈⢻⠉⠛⠿⣿⣿⣿⣿⣿⣿⠿⠛⠙⣿⠙⠙⠉⢩⡟⠟⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⢹⣿⣿⡿⠛⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣷⣤⣿⣦⣤⣾⣿⠿⣷⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠉⠀⠈⠀⠀⠀⠀⠗⠉⠿⣿⣿⢹⣿⠛⠉⠛⠉⠉⠀⠈⡍⠉⠉⣿⠉⠉⠙⣹⣿⡿⠟⠿⣿⣿⡟⠉⠟⠛⠉⠉⠉⠀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⣷⠀⠀⢙⠀⠀⠈⠀⣶⣿⡄⢻⡿⠛⣭⡀⠀⠀⠀⠀⠀⢹⠉⠘⠛⠙⠛⠉⣿⣯⣬⣷⣿⠓⢿⣧⠈⠉⠉⠉⠉⠉⠉⠈⠉⠉⠛⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⡄⠀⠈⠀⠀⠀⠀⣿⣿⣷⣶⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⢿⠀⠉⠙⠉⠙⠁⠉⣿⣿⣿⣿⣿⣿⣿⣷⣬⣄⣀⣤⣶⣿⣿⠛⠉⠉⠛⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡟⠛⠛⠛⠛⠀⠘⠛⠛⠛⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⠿⠛⠛⠃⡄⠀⠀⠀⠀⠈⣿⣝⠈⠀⠈⠉⠉⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⠀⠀⠀⠉⠈⠀⠈⠉⠈⠙⣿⣿
⣿⣿⣿⣿⣿⡇⠀⣿⣾⣶⠀⢸⣿⣶⡆⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⡟⠀⠀⠀⣿⣿⣿⡏⠋⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠹⣿⠉⠉⠉⠉⣴⣿⣿⣿⣿⠁⠀⠉⠀⠀⠀⠀⠈⠈⠈⠈⠈⠈⠀⠈⠈⠈⠉⠙
⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⠀⢸⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⣾⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⠉⠉⠉⣸⣿⣿⣿⣿⣿⡏⠈⠈⠈⠀⠀⠀⠈⠈⠈⠀⠈⠉⠉⠈⡤⠉⡟⣿
⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⠀⢸⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠀⠀⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡟⠉⠉⠙⣿⣿⣿⣿⣿⣿⡉⠉⠉⠉⠉⠀⠈⠈⠉⠉⠈⠉⠉⠉⣿⠉⢹⡇⠸
⣿⣿⣿⣿⣿⣇⣀⣿⣿⣿⠀⢸⣿⣀⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⢸⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠋⠉⠉⢉⣿⣿⣿⣿⣿⣿⡏⠉⠉⠉⠉⠉⠉⠉⠉⢿⣿⠉⠉⣽⠛⠉⣿⠉⠉
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠉⠈⠈⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁⠈⠉⢹⣿⣿⣿⣿⣿⣿⠋⠉⠉⠉⠉⠉⠉⠉⠙⠉⢿⣿⠉⠛⠉⢿⠛⠙⠉
⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠙⠙⠛⠛⠛⠛⠛⠛⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠛⠙⠙⠉⠛⠛⠛⠛⠛⠛⠋⠛⠛⠛⠙⠙⠙⠙⠙⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛` +
    `\n享受编程，享受生活 Enjoy coding, enjoy life. - 中国软件匠艺社区 - CodingStyle.cn\n`
  );
};

module.exports = {
  SHOW_LOGO,
  BLANK_SPACE,
  COLOR_SCHEMA,
  TEST_RESULT_ICON,
  TEST_RESULT_TEXT,
  TEST_RESULT_STATUS,
  FONT_STYLE,
};
