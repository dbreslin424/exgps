const { promisify } = require('util');
const ExifImage = promisify(require('exif').ExifImage);
const { DIRECTION_FACTORS } = require('../config/constants');

//TODO Promisify and add async await

const translateToDecimal = (coordsArray, directionRef) => {
  const [degrees = 0, minutes = 0, seconds = 0] = coordsArray;

  // Multiply by direction factor to get negative values for South and West coordinates
  const direction = DIRECTION_FACTORS[directionRef] || 1;

  return (degrees + minutes / 60 + seconds / 3600) * direction;
};

const loadExifData = async file => {
  console.log('# Reading GPS data from EXIF...');
  let exifData;
  try {
    exifData = await ExifImage({ image: file });
  } catch (error) {
    throw new Error(error);
  }

  const { gps } = exifData;

  const lat = translateToDecimal(gps.GPSLatitude, gps.GPSLatitudeRef);

  const long = translateToDecimal(gps.GPSLongitude, gps.GPSLongitudeRef);

  const alt = translateToDecimal([gps.GPSAltitude]);

  console.log('Done');

  return {
    latitude: lat || 0,
    longitude: long || 0,
    altitude: alt || 0
  };
};

const generateCoordinates = async file => {
  const coordsArray = [];
  const coords = await loadExifData(file);

  coordsArray.push(coords);
  return coordsArray;
};

module.exports = generateCoordinates;
