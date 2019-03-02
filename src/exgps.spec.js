const exgps = require('./exgps');
const ExifGPS = require('./modules/exif-gps');
const KML = require('./modules/kml-generator');

jest.mock('./modules/exif');
jest.mock('./modules/kml-generator');

describe('exgps main functionality', () => {
  it('should run main method and call child modules', () => {
    exgps('/path/to/file.jpg').then(() => {
      expect(ExifGPS).toHaveBeenCalled();
      expect(KML.generate).toHaveBeenCalled();
      expect(KML.write).toHaveBeenCalled();
    });
  });
  it('should throw an error if no file is provided', () => {
    expect(() => {
      exgps();
    }).toThrow();
  });
});
