const { renameResize } = require('./src');

const args = process.argv.slice(2);

const sourceDir = args[0];
const MAX_SIDE = 1024 * 4; // 4K

renameResize(sourceDir, MAX_SIDE)
  .then((newFiles) => {
    console.log('\n', `${newFiles.length} photos renamed and resized.`);
  })
  .catch(console.error);
