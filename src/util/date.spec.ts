import { parseExifDate } from './date';

const exifDate = '2017:08:11 20:00:01';
const isoDate = '2017-08-12T00:00:01.000Z';

describe('Date format utils', () => {
  it('parseExifDate', () => {
    expect(parseExifDate(exifDate)).toEqual(isoDate);
  });
});
