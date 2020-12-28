const path = require('path');
const fs = require('fs');

const isDir = (filePath) => fs.lstatSync(filePath).isDirectory();

const isFile = (filePath) => {
  const isF = fs.lstatSync(filePath).isFile();
  const isDS = path.basename(filePath) === '.DS_Store';
  return isF && !isDS;
};

const isPhoto = (filePath, extensions = []) => {
  if (!isFile(filePath)) return false;
  return extensions.includes(path.extname(filePath));
};

const resetDir = (dirPath) => {
  fs.rmdirSync(dirPath, { recursive: true });
  fs.mkdirSync(dirPath, { recursive: true });
};

const copyUnchanged = (filePath, destDir) => {
  const newFileName = path.join(destDir, path.basename(filePath));
  fs.copyFileSync(filePath, newFileName);
  return newFileName;
};

module.exports = {
  isFile,
  isPhoto,
  isDir,
  resetDir,
  copyUnchanged,
};
