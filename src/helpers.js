const fs = require('fs');

const isDir = (filePath) => fs.lstatSync(filePath).isDirectory();

const isFile = (filePath) => fs.lstatSync(filePath).isFile();

const resetDir = (dirPath) => {
  fs.rmdirSync(dirPath, { recursive: true });
  fs.mkdirSync(dirPath, { recursive: true });
};

module.exports = {
  isFile,
  isDir,
  resetDir,
};
