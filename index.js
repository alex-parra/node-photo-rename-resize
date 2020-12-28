const { renameResize } = require('./src');

const args = process.argv.slice(2);

const sourceDir = args[0];
const MAX_SIDE = 1024 * 3;

renameResize(sourceDir, MAX_SIDE);
