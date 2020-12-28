const fs = require('fs');
const path = require('path');
const { isFile, resetDir } = require('./helpers');
const { renameResize } = require('./renameResize');

module.exports = {
  renameResize(sourceDir, MAX_SIDE) {
    const destDir = path.join(sourceDir, 'SMALL');
    resetDir(destDir);

    const files = fs.readdirSync(sourceDir).filter(isFile);

    files.forEach((file) => {
      const absFilePath = path.join(sourceDir, file);
      renameResize(absFilePath, destDir, MAX_SIDE);
    });
  },
};
