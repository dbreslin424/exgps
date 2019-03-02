/// <reference path='../types/exif.d.ts' />

import { promisify } from 'util';
import exif from 'exif';
import { DIRECTION_FACTORS } from '../config/constants';
import { Coords } from '../types/coords';

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

export const generateCoordinates = async (file: string): Promise<Coords[]> => {
  const coordsArray = [];
  const coords = await loadExifData(file);

  coordsArray.push(coords);
  return coordsArray;
};
