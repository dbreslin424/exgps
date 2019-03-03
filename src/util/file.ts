import fs from 'fs';
import { FILE_TYPE, DIRECTORY_TYPE } from '../config/constants';

const imageRegExp = /\.(jpg|jpeg|png|gif)$/i;

export const getPathType = (path: string = '') => {
  try {
    const stats = fs.statSync(path);
    if (stats.isFile()) {
      return FILE_TYPE;
    } else if (stats.isDirectory()) {
      return DIRECTORY_TYPE;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const isImageFile = (path: string) => {
  return imageRegExp.test(path);
};

export const listImagesInDir = (path: string) => {
  const files = fs.readdirSync(path);
  return files.filter((file: string) => {
    return isImageFile(file);
  });
};
