const mockExif = {
  gps: {
    GPSLatitude: [5, 5, 5],
    GPSLongitude: [5, 5, 5]
  }
};

function ExifImage() {
  return (config, callback) => {
    callback(null, mockExif);
  };
}

module.exports = {
  ExifImage
};
