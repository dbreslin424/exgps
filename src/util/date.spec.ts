import { parseExifDate } from './date';

const date = new Date('05 October 2011 14:48 UTC');
const isoDate = date.toISOString();
const exifDate = [
  [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()].join(':'),
  [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].join(':')
].join(' ');

describe('Date format utils', () => {
  it.skip('parseExifDate', () => {
    const date = parseExifDate(exifDate);
    expect(date).toEqual(isoDate);
  });
});
