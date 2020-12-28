const path = require('path');
const sharp = require('sharp');
const exifr = require('exifr');

/**
 * Get photo exif date (date taken) and return as YYYYMMDD-HHMMSS
 */
const exifDateName = async (filePath) => {
  const exif = await exifr.parse(filePath);
  const dateIso = new Date(exif.DateTimeOriginal).toISOString();
  const newName = dateIso.slice(0, 19).replace(/[-:]/g, '').replace('T', '-');
  return newName;
};

/**
 * Resize a photo and save to file as optimized JPG
 */
const renameResize = async (filePath, destDir, MAX_SIDE) => {
  console.log(`Processing ${filePath} ...`);
  const newName = await exifDateName(filePath);

  const img = sharp(filePath);
  const meta = await img.metadata();
  const side = meta.width > meta.height ? 'width' : 'height';

  img
    .withMetadata()
    .resize({ [side]: MAX_SIDE })
    .jpeg({ quality: 90 })
    .toFile(path.join(destDir, `${newName}.jpg`));
};

module.exports = {
  renameResize,
};
