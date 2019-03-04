/// <reference path='exgps.d.ts' />

import * as ExifGPS from './modules/exif-gps';
import * as KML from './modules/kml-generator';
import { OUTPUT_FILE_EXTENSION } from './config/constants';
//TODO extract CLI integration

interface Options {
  outputFile?: string;
}

const setDefaultOptions = (options: any): Options => {
  return {
    ...options,
    outputFile: options.outputFile
      ? `${options.outputFile}.${OUTPUT_FILE_EXTENSION}`
      : null
  };
};

const prevalidation = (path: string) => {
  if (!path) {
    throw new Error('File path not provided.');
  }
};

const main = async (path: string, options: Options) => {
  try {
    const coords = await ExifGPS.generateImageData(path);
    const kml = KML.generate(coords);

    if (options.outputFile) {
      KML.write(kml, options.outputFile);
      console.log('Finished.');
    } else {
      console.log('-- KML --------');
      console.log(kml);
      console.log('---------------');
    }
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
