const fs = require('fs');
const path = require('path');
const { isPhoto, resetDir } = require('./helpers');
const { renameResize } = require('./renameResize');

module.exports = {
  renameResize(sourceDir, MAX_SIDE) {
    const destDir = path.join(sourceDir, 'SMALL');
    resetDir(destDir);

    const files = fs.readdirSync(sourceDir).filter(isPhoto);

    console.log('');
    console.log(`Processing ${files.length} photos in '${sourceDir}'`);

    return Promise.all(
      files.map((file) => {
        const absFilePath = path.join(sourceDir, file);
        return renameResize(absFilePath, destDir, MAX_SIDE);
      }),
    );
  },
};
