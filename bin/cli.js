#!/usr/bin/env node
const minimist = require('minimist');
const exgps = require('../exgps.js');

const args = minimist(process.argv.slice(2));
let cmd = args._[0];

if (args.version || args.v) {
  cmd = 'version';
}

// parse flags into options object
const options = {
  file: args.f || args.file
};

// process commands
switch (cmd) {
  case 'version':
    require('../cmds/version.js')();
    break;
  default:
    exgps(options);
}

//TODO load files from folder
