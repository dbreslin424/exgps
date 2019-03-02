const KML = require('./kml-generator.js');
const HB = require('handlebars');
const fs = require('fs');
jest.mock('handlebars');
jest.mock('fs');

HB.compile = jest.fn().mockReturnValue(() => {});
const mockPlacemark = {
  longitude: 5,
  latitude: 5,
  altitude: 5
};

describe('KML Document generation', () => {
  it('returns KML document string', () => {
    const doc = KML.generate([mockPlacemark]);
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(HB.compile).toHaveBeenCalled();
  });

  it('writes kml to filesystem via fs', () => {
    KML.write('1234');
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
