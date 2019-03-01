const { ExifGPS, KML } = require('./modules');

//TODO extract CLI integration

const validateOptions = ({ file }) => {
  if (!file) {
    throw new Error('File path not provided.');
  }

  //add defaults for options

  return {
    file
  };
};

const main = async ({ file }) => {
  try {
    const coords = await ExifGPS(file);
    const kml = KML.generate(coords);
    KML.write(kml);
    console.log('Finished.');
  } catch (error) {
    console.error(error);
  }
};

module.exports = main;

//TODO add logging
