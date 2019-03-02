/// <reference path='exgps.d.ts' />

import * as ExifGPS from './modules/exif-gps';
import * as KML from './modules/kml-generator';

//TODO extract CLI integration

interface Options {
  outFile: string;
}

const validateOptions = (options: Options) => {
  //add defaults for options

  console.log('options:' + options);
  return {};
};

const prevalidation = (path: string, options: Options) => {
  if (!path) {
    throw new Error('File path not provided.');
  }

  validateOptions(options);
};

const main = async (path: string, options: Options) => {
  console.log(options);
  try {
    const coords = await ExifGPS.generateCoordinates(path);
    const kml = KML.generate(coords);
    KML.write(kml);
    console.log('Finished.');
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const run = (path: string, options: Options): Promise<any> => {
  prevalidation(path, options);
  return main(path, options);
};

//TODO add logging
