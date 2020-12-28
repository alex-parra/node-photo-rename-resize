const { renameResize } = require('./src');

const args = process.argv.slice(2);

const sourceDir = args[0];
const MAX_SIDE = 1024 * 4; // 4K
const EXTENSIONS = ['.jpg', '.png', '.heic'];

renameResize(sourceDir, { MAX_SIDE, EXTENSIONS })
  .then((newFiles) => {
    console.log('\n', `${newFiles.length} photos renamed and resized.`);
  })
  .catch(console.error);
