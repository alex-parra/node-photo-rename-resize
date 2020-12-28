const path = require('path');
const fs = require('fs');

const isDir = (filePath) => fs.lstatSync(filePath).isDirectory();

const isFile = (filePath) => fs.lstatSync(filePath).isFile();

const isPhoto = (filePath, extensions = []) => {
  if (!isFile(filePath)) return false;
  return extensions.includes(path.extname(filePath));
};

const resetDir = (dirPath) => {
  fs.rmdirSync(dirPath, { recursive: true });
  fs.mkdirSync(dirPath, { recursive: true });
};

module.exports = {
  isFile,
  isPhoto,
  isDir,
  resetDir,
};
