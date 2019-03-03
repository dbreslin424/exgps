export const DEFAULT_OUTPUT_FILENAME = 'coordinates';
export const OUTPUT_FILE_EXTENSION = 'kml';

export const FILE_TYPE = 'file';
export const DIRECTORY_TYPE = 'dir';

interface DirectionFactors {
  [key: string]: number;
}

export const DIRECTION_FACTORS: DirectionFactors = {
  N: 1,
  S: -1,
  E: 1,
  W: -1
};
