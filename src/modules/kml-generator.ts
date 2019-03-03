import HB from 'handlebars';
import fs from 'fs';
import { ImageData } from '../types/image-data';

export const generate = (placemarks: ImageData[]) => {
  console.log('# Generating KML...');
  const kmlTemplate = fs.readFileSync(
    `${process.cwd()}/templates/kml.handlebars`,
    'utf8'
  );

  const compiledTemplate = HB.compile(kmlTemplate);

  var kml = compiledTemplate({ placemarks });

  return kml;
};

export const write = (kmlContents: string, outputFile: string) => {
  console.log(`# Writing to ${outputFile}...`);
  fs.writeFileSync(outputFile, kmlContents, 'utf8');
};
