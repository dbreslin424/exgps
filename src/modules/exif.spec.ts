import { generateCoordinates } from './exif-gps';
import { ImageData } from '../types/image-data';
import 'jest';
const decimalLatitude = 5.084722222222222;

jest.mock('fs');

describe('Exif GPS data extraction', () => {
  it('converts coordinate array to decimal', () => {
    generateCoordinates('file.jpg').then((coords: ImageData[]) => {
      const { latitude } = coords[0];
      expect(latitude).toEqual(decimalLatitude);
    });
  });
});
