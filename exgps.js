const minimist = require('minimist');
const ExifImage = require('exif').ExifImage;

//TODO CLI integration

const args = minimist(process.argv.slice(2));
let cmd = args._[0];

if (args.version || args.v) {
  cmd = 'version';
}

switch (cmd) {
  case !cmd:
    break;
  case 'version':
    require('./cmds/version.js')();
    break;
  default:
    //console.error(`"${cmd}" is not a valid command!`);
    break;
}

//TODO load files from folder

//TODO extract GPS metadata from EXIF
//TODO extract to module
const file = args.f || args.file;

try {
  new ExifImage({ image: file }, function(error, exifData) {
    if (error) {
      console.log('Error: ' + error.message);
      return;
    }

    const lat = exifData.gps.GPSLatitude.join(',');
    const long = exifData.gps.GPSLongitude.join(',');

    console.log('Latitude:', lat);
    console.log('Longitude', long);
  });
} catch (error) {
  console.log('Error: ' + error.message);
}

//TODO render KML document

//TODO export KML document

//TODO add logging
