const HB = require('handlebars');
const fs = require('fs');

const generate = placemarkArray => {
  console.log('# Generating KML...');
  const kmlTemplate = fs.readFileSync(
    `${process.cwd()}/templates/kml.handlebars`,
    'utf8'
  );

  const compiledTemplate = HB.compile(kmlTemplate);

  var kml = compiledTemplate({ placemarks: placemarkArray });

  console.log('> Done');
  return kml;
};

const write = kmlContents => {
  console.log('# Writing to .kml...');
  fs.writeFileSync('coordinates.kml', kmlContents, 'utf8');
  console.log('> Done');
};

module.exports = {
  generate,
  write
};
