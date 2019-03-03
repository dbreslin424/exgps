import { isImageFile, getPathType, listImagesInDir } from './file';
import { FILE_TYPE, DIRECTORY_TYPE } from '../config/constants';
import mockfs from 'mock-fs';

const filePath = '/path/to/file.jpg';
const dirPath = '/path/to/dir/';

mockfs({
  [filePath]: Buffer.from([8, 6, 7, 5, 3, 0, 9]),
  [dirPath]: {
    'file.jpg': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
    'notimage.txt': '1234'
  }
});

describe('File checking utils', () => {
  describe('getPathType', () => {
    it('returns "file" type for file path', () => {
      const fileType = getPathType(filePath);
      expect(fileType).toEqual(FILE_TYPE);
    });

    it('returns "dir" type for file path', () => {
      const fileType = getPathType(dirPath);
      expect(fileType).toEqual(DIRECTORY_TYPE);
    });

    it('returns null for unknown path', () => {
      const fileType = getPathType('/wdawdaw/');
      expect(fileType).toEqual(null);
    });
  });

  describe('isImageFile', () => {
    it('returns true for image file path', () => {
      const isImage = isImageFile(filePath);
      expect(isImage).toBeTruthy();
    });

    it('returns false for non-image file path', () => {
      const isImage = isImageFile(dirPath);
      expect(isImage).toBeFalsy();
    });
  });

  describe('listImagesInDir', () => {
    it('returns list of image files in directory', () => {
      const images = listImagesInDir(dirPath);
      expect(images).toEqual(expect.arrayContaining(['file.jpg']));
    });
  });

  afterAll(() => {
    mockfs.restore();
  });
});
