import { generate, write } from './kml-generator';
import * as HB from 'handlebars';
import * as fs from 'fs';

jest.mock('handlebars', () => {
  return {
    compile: jest.fn(() => {})
  };
});
jest.mock('fs');

const mockPlacemark = {
  longitude: 5,
  latitude: 5,
  altitude: 5
};

describe('KML Document generation', () => {
  it.skip('returns KML document string', () => {
    generate([mockPlacemark]);
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(HB.compile).toHaveBeenCalled();
  });

  it('writes kml to filesystem via fs', () => {
    write('1234', 'test.kml');
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
