const fs = require('fs');
const path = require('path');
const { isFile, isPhoto, resetDir, copyUnchanged } = require('./helpers');
const { renameResize } = require('./renameResize');

module.exports = {
  renameResize: async (sourceDir, { MAX_SIDE, EXTENSIONS }) => {
    const destDir = path.join(sourceDir, 'SMALL');
    resetDir(destDir);

    const files = fs.readdirSync(sourceDir).filter(isFile);

    console.log('');
    console.log(`Processing ${files.length} photos in '${sourceDir}'`);

    const newFiles = [];
    for (let file of files) {
      console.log(` ./${path.basename(file)}`);

      const absFilePath = path.join(sourceDir, file);
      let newFileName = '';
      if (isPhoto(absFilePath, EXTENSIONS)) {
        newFileName = await renameResize(absFilePath, destDir, { MAX_SIDE });
      } else {
        newFileName = await copyUnchanged(absFilePath, destDir);
      }

      newFiles.push(newFileName);
    }

    return newFiles;
  },
};
