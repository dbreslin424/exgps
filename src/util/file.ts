import { statSync, readFile, readdirSync } from 'fs';
import { promisify } from 'util';
import { FILE_TYPE, DIRECTORY_TYPE } from '../config/constants';
import path from 'path';

const readFileP = promisify(readFile);
const imageRegExp = /\.(jpg|jpeg|png|gif)$/i;

export const getPathType = (path: string = '') => {
  try {
    const stats = statSync(path);
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
  const files = readdirSync(path);
  return files.filter((file: string) => {
    return isImageFile(file);
  });
};

export const loadImage = async (path: string): Promise<Buffer> => {
  if (!isImageFile(path)) {
    throw new Error('File must be image');
  }

  try {
    return await readFileP(path);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loadImages = async (dirPath: string): Promise<Buffer[]> => {
  const imageFiles = listImagesInDir(dirPath);
  const promises: Promise<Buffer>[] = imageFiles.map(
    async (file: string): Promise<Buffer> => {
      return await loadImage(path.join(dirPath, file));
    }
  );

  return Promise.all<any>(promises).then((buffer: any) => buffer);
};
