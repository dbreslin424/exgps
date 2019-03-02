import HB from 'handlebars';
import fs from 'fs';
import path from 'path';

interface Coords {
  longitude: number;
  latitude: number;
  altitude: number;
}

export const generate = (placemarks: Coords[]) => {
  console.log('# Generating KML...');
  const kmlTemplate = fs.readFileSync(
    `${process.cwd()}/templates/kml.handlebars`,
    'utf8'
  );

  const compiledTemplate = HB.compile(kmlTemplate);

  var kml = compiledTemplate({ placemarks });

  console.log('> Done');
  return kml;
};

export const write = (kmlContents: string) => {
  console.log('# Writing to .kml...');
  fs.writeFileSync(path.join('coordinates.kml'), kmlContents, 'utf8');
  console.log('> Done');
};
