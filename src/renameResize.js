const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const exifr = require('exifr');
const dateFormat = require('date-fns/format');

const adjustIfExists = (destDir, dateFileName, ext) => {
  while (fs.existsSync(path.join(destDir, dateFileName + ext))) {
    const seconds = (Number(dateFileName.slice(-2)) + 1) % 60;
    dateFileName = dateFileName.slice(0, -2) + `${seconds}`.padStart(2, '0');
  }

  return path.join(destDir, dateFileName + ext);
};

/**
 * Get photo exif date (date taken) and return as YYYYMMDD-HHMMSS
 */
const exifDateName = async (filePath) => {
  const exif = await exifr.parse(filePath);

  let date = new Date();
  if (!exif || !exif.DateTimeOriginal) {
    const stat = fs.statSync(filePath);
    date = new Date(stat.birthtime);
  } else {
    date = new Date(exif.DateTimeOriginal);
  }

  return dateFormat(date, 'yyyyMMdd-HHmmss');
};

/**
 * Resize a photo and save to file as optimized JPG
 */
const renameResize = async (filePath, destDir, { MAX_SIDE }) => {
  console.log(` ./${path.basename(filePath)}`);

  let newName = await exifDateName(filePath);
  const destFile = adjustIfExists(destDir, newName, '.jpg');

  const img = sharp(filePath);
  const meta = await img.metadata();
  const side = meta.width > meta.height ? 'width' : 'height';

  await img
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
