/// <reference path='exgps.d.ts' />

import * as ExifGPS from './modules/exif-gps';
import * as KML from './modules/kml-generator';
import {
  DEFAULT_OUTPUT_FILENAME,
  OUTPUT_FILE_EXTENSION
} from './config/constants';
//TODO extract CLI integration

interface Options {
  outputFile: string;
}

const setDefaultOptions = (options: any): Options => {
  const outputFileName = options.outputFile || DEFAULT_OUTPUT_FILENAME;
  return {
    ...options,
    outputFile: `${outputFileName}.${OUTPUT_FILE_EXTENSION}`
  };
};

const prevalidation = (path: string) => {
  if (!path) {
    throw new Error('File path not provided.');
  }
};

const main = async (path: string, options: Options) => {
  try {
    const coords = await ExifGPS.generateCoordinates(path);
    const kml = KML.generate(coords);
    KML.write(kml, options.outputFile);
    console.log('Finished.');
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const run = (path: string, options: object = {}): Promise<any> => {
  prevalidation(path);
  const defaultedOptions = setDefaultOptions(options);
  return main(path, defaultedOptions);
};

//TODO add logging
