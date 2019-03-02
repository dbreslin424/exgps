import { run } from './exgps';
import { generateCoordinates } from './modules/exif-gps';
import { generate, write } from './modules/kml-generator';

//jest.mock('./modules/exif');
//jest.mock('./modules/kml-generator');

describe('exgps main functionality', () => {
  it('should run main method and call child modules', () => {
    run('/path/to/file.jpg').then(() => {
      expect(generateCoordinates).toHaveBeenCalled();
      expect(generate).toHaveBeenCalled();
      expect(write).toHaveBeenCalled();
    });
  });
});
