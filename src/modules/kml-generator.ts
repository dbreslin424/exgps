import HB from 'handlebars';
import fs from 'fs';
import { Coords } from '../types/coords';

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

export const write = (kmlContents: string, outFile: string) => {
  console.log(`# Writing to ${outFile}...`);
  fs.writeFileSync(outFile, kmlContents, 'utf8');
  console.log('> Done');
};
