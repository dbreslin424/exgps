const minimist = require('minimist');
const { ExifGPS } = require('./modules');

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
    break;
}

//TODO load files from folder

const file = args.f || args.file;
ExifGPS(file).then(coords => console.log(coords), error => console.log(error));

//TODO render KML document

//TODO export KML document

//TODO add logging
