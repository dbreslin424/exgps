const ExifGPS = require('./exif.js');

const decimalLatitude = 5.084722222222222;

describe('Exif GPS data extraction', function() {
  test('returns GPS coordinate object', function() {
    ExifGPS('file.jpg').then(coords => {
      expect(coords).toBe(
        objectContaining({
          latitude: expect.any(Number),
          longitude: expect.any(Number)
        })
      );
    });
  });

  test('converts coordinate array to decimal', function() {
    ExifGPS('file.jpg').then(coords => {
      const { latitude } = coords;
      expect(latitude).toEqual(decimalLatitude);
    });
  });
});
