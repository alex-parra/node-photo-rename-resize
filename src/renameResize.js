const { exec } = require('child_process');
const path = require('path');
const sharp = require('sharp');
const exifr = require('exifr');
const dateFormat = require('date-fns/format');

/**
 * Get photo exif date (date taken) and return as YYYYMMDD-HHMMSS
 */
const exifDateName = async (filePath) => {
  const exif = await exifr.parse(filePath);
  return dateFormat(new Date(exif.DateTimeOriginal), 'yyyyMMdd-HHmmss');
};

/**
 * Resize a photo and save to file as optimized JPG
 */
const renameResize = async (filePath, destDir, MAX_SIDE) => {
  console.log(` ./${path.basename(filePath)}`);

  const newName = await exifDateName(filePath);
  const destFile = path.join(destDir, `${newName}.jpg`);

  const img = sharp(filePath);
  const meta = await img.metadata();
  const side = meta.width > meta.height ? 'width' : 'height';

  img
    .withMetadata()
    .resize({ [side]: MAX_SIDE })
    .jpeg({ quality: 90 })
    .toFile(destFile);

  // Set file timestamps
  const stamp = newName.slice(0, -2).replace('-', '') + '.' + newName.slice(-2);
  exec(`touch -t ${stamp} "${destFile}"`);

  return destFile;
};

module.exports = {
  renameResize,
};
