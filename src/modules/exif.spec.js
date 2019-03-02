const ExifGPS = require('./exif-gps.js');

const decimalLatitude = 5.084722222222222;

describe('Exif GPS data extraction', () => {
  it('returns GPS coordinate object', () => {
    ExifGPS('file.jpg').then(coords => {
      expect(coords).toBe(
        objectContaining({
          latitude: expect.any(Number),
          longitude: expect.any(Number),
          altitude: expect.any(Number)
        })
      );
    });
  });

  it('converts coordinate array to decimal', () => {
    ExifGPS('file.jpg').then(coords => {
      const { latitude } = coords;
      expect(latitude).toEqual(decimalLatitude);
    });
  });
});
