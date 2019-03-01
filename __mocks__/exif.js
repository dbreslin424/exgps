const mockExif = {
  gps: {
    GPSLatitude: [5, 5, 5],
    GPSLatitudeRef: 'N',
    GPSLongitude: [5, 5, 5],
    GPSLatitudeRef: 'W',
    GPSAltitude: 0
  }
};

function ExifImage() {
  return Promise.resolve(mockExif);
}

module.exports = {
  ExifImage
};
