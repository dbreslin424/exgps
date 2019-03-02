# exgps

[![Build Status](https://travis-ci.org/dbreslin424/exgps.svg?branch=master)](https://travis-ci.org/dbreslin424/exgps) [![Coverage Status](https://coveralls.io/repos/github/dbreslin424/exgps/badge.svg?branch=master)](https://coveralls.io/github/dbreslin424/exgps?branch=master)

Photo GPS coordinate extractor tool that generates KML files

## Installation

npm package coming soon

## Usage

`exgps` exposes a function that takes a file path to an image file with EXIF data and outputs a KML document containing GPS coordinates of the file.

Example _app.js_

```javascript
const exgps = require('exgps');

exgps('/path/to/image.jpg');
```

_note_: currently `exgps` will output the kml file to `process.cwd()`. Support for providing a different path will be added in the future.

## Options

Coming soon

## Future additions

- export KML to specific directory
- support for multiple photos in a folder
- CLI support
