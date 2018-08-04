const fs = require('fs');
const {promisify} = require('util');

module.exports = {
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  mkdir: promisify(fs.mkdir),
};
