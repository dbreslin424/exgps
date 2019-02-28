const ExifImage = require('exif').ExifImage;

const translateToDecimal = coordsArray => {
  const [degrees = 0, minutes = 0, seconds = 0] = coordsArray;

  return degrees + minutes / 60 + seconds / 3600;
};

console.log(translateToDecimal([5, 5, 5]));

const loadExifData = file => {
  return new Promise((resolve, reject) => {
    new ExifImage({ image: file }, function(error, exifData) {
      if (error) {
        console.log('Error: ' + error.message);
        return;
      }

      const lat = translateToDecimal(exifData.gps.GPSLatitude);
      const long = translateToDecimal(exifData.gps.GPSLongitude);

      resolve({
        latitude: lat,
        longitude: long
      });
    });
    try {
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = loadExifData;
