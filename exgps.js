const { ExifGPS, KML } = require('./modules');

//TODO extract CLI integration

const validateOptions = options => {
  //add defaults for options

  return {};
};

const prevalidation = () => {
  if (!path) {
    throw new Error('File path not provided.');
  }
};

const main = async (path, options) => {
  try {
    const coords = await ExifGPS(path);
    const kml = KML.generate(coords);
    KML.write(kml);
    console.log('Finished.');
  } catch (error) {
    console.error(error);
  }
};

module.exports = (path, options) => {
  prevalidation(path, options);
  main(path, options);
};

//TODO add logging
