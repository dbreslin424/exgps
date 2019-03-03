/// <reference path='../types/exif.d.ts' />

import { promisify } from 'util';
import exif from 'exif';
import { DIRECTION_FACTORS } from '../config/constants';
import { Coords } from '../types/coords';
import { getPathType } from '../util/file';
import { FILE_TYPE, DIRECTORY_TYPE } from '../config/constants';

const exifPromise = promisify(exif.ExifImage);
//TODO Promisify and add async await

const translateToDecimal = (coords: number[], directionRef: string = 'N') => {
  const [degrees = 0, minutes = 0, seconds = 0] = coords;

  // Multiply by direction factor to get negative values for South and West coordinates
  const direction = DIRECTION_FACTORS[directionRef] || 1;

  return (degrees + minutes / 60 + seconds / 3600) * direction;
};

const loadExifData = async (file: string): Promise<Coords> => {
  console.log('# Reading GPS data from EXIF...');
  let exifData;
  try {
    exifData = await exifPromise({ image: file });
  } catch (error) {
    throw new Error(error);
  }

  const { gps } = exifData;

  const lat = translateToDecimal(gps.GPSLatitude, gps.GPSLatitudeRef);

  const long = translateToDecimal(gps.GPSLongitude, gps.GPSLongitudeRef);

  const alt = translateToDecimal([gps.GPSAltitude]);

  console.log('Done');

  return {
    latitude: lat || 0,
    longitude: long || 0,
    altitude: alt || 0
  };
};

const loadFromFile = async (filePath: string): Promise<Coords[]> => {
  const coordsArray = [];
  const coords = await loadExifData(filePath);

  coordsArray.push(coords);
  return coordsArray;
};

// const loadFromDir = async (dirPath: string): Promise<Coords> => {
//   const coordsArray: Coords[] = [];
//   const imageFiles = listImagesInDir(dirPath);
//   const promises = imageFiles.map(
//     async (file: string): Promise<Coords> => await loadExifData(file)
//   );
//   //return coordsArray;

//   //return await Promise.all<Coords, void>(promises);
// };

export const generateCoordinates = async (path: string): Promise<Coords[]> => {
  const pathType = getPathType(path);

  let coords: Coords[] = [];
  switch (pathType) {
    case FILE_TYPE:
      coords = await loadFromFile(path);
      break;
    case DIRECTORY_TYPE:
      //coords = await loadFromDir(path);
      break;
  }

  return coords;
};
