const fs = require('fs');
const path = require('path');
const { isPhoto, resetDir } = require('./helpers');
const { renameResize } = require('./renameResize');

module.exports = {
  renameResize: async (sourceDir, { MAX_SIDE, EXTENSIONS }) => {
    const destDir = path.join(sourceDir, 'SMALL');
    resetDir(destDir);

    const files = fs.readdirSync(sourceDir).filter((f) => isPhoto(f, EXTENSIONS));

    console.log('');
    console.log(`Processing ${files.length} photos in '${sourceDir}'`);

    const newFiles = [];
    for (let file of files) {
      const absFilePath = path.join(sourceDir, file);
      const newFileName = await renameResize(absFilePath, destDir, { MAX_SIDE });
      newFiles.push(newFileName);
    }

    return newFiles;
  },
};
