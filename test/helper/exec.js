const { execSync } = require('child_process');

const exec = (arg) => {
  try {
    const cmd = arg.replace('hlj', 'node src/hlj.js');
    return execSync(cmd).toString();
  } catch (e) {
    return e;
  }
};

module.exports = { exec };
