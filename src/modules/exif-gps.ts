/// <reference path='../types/exif.d.ts' />

import { promisify } from 'util';
import exif from 'exif';
import { DIRECTION_FACTORS } from '../config/constants';
import { ImageData } from '../types/image-data';
import { getPathType, listImagesInDir } from '../util/file';
import { parseExifDate } from '../util/date';
import { FILE_TYPE, DIRECTORY_TYPE } from '../config/constants';
import path from 'path';

const exifPromise = promisify(exif.ExifImage);
//TODO Promisify and add async await

const translateToDecimal = (coords: number[], directionRef: string = 'N') => {
  const [degrees = 0, minutes = 0, seconds = 0] = coords;

  // Multiply by direction factor to get negative values for South and West coordinates
  const direction = DIRECTION_FACTORS[directionRef] || 1;

  return (degrees + minutes / 60 + seconds / 3600) * direction;
};

const loadExifData = async (file: string): Promise<ImageData> => {
  console.log(`# Reading EXIF GPS data from ${file}...`);
  let exifData;
  try {
    exifData = await exifPromise({ image: file });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const { gps, exif } = exifData;

  const lat = translateToDecimal(gps.GPSLatitude, gps.GPSLatitudeRef);

  const long = translateToDecimal(gps.GPSLongitude, gps.GPSLongitudeRef);

  const alt = translateToDecimal([gps.GPSAltitude]);

  const time = parseExifDate(exif.CreateDate);

  const fileName = path.basename(file, path.extname(file));
  return {
    name: fileName,
    latitude: lat || 0,
    longitude: long || 0,
    altitude: alt || 0,
    timestamp: time
  };
};

const loadFromFile = async (filePath: string): Promise<ImageData[]> => {
  const imageData = await loadExifData(filePath);
  return [imageData];
};

// TODO figure out how to use async/await instead of promise handling
const loadFromDir = async (dirPath: string): Promise<ImageData[]> => {
  const imageFiles = listImagesInDir(dirPath);
  const promises: Promise<ImageData>[] = imageFiles.map(
    async (file: string): Promise<ImageData> => {
      return await loadExifData(path.join(dirPath, file));
    }
  );

  return Promise.all<any>(promises).then((coords: any) => coords);
};

export const generateCoordinates = async (
  path: string
): Promise<ImageData[]> => {
  const pathType = getPathType(path);

  let imageData: ImageData[] = [];
  switch (pathType) {
    case FILE_TYPE:
      imageData = await loadFromFile(path);
      break;
    case DIRECTORY_TYPE:
      imageData = await loadFromDir(path);
      break;
  }

  return imageData;
};
