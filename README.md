# exgps

[![Build Status](https://travis-ci.org/dbreslin424/exgps.svg?branch=master)](https://travis-ci.org/dbreslin424/exgps) [![Coverage Status](https://coveralls.io/repos/github/dbreslin424/exgps/badge.svg?branch=master)](https://coveralls.io/github/dbreslin424/exgps?branch=master)

Photo GPS coordinate extractor tool that generates KML files

## Installation

npm package coming soon

## Usage

`exgps` takes a file path to an image file with EXIF data, then outputs a KML document containing GPS coordinates.

Example _app.js_

```javascript
const exgps = require('exgps');

exgps.run('/path/to/image.jpg', [options]);
```

## Options

```javascript
{
  outFile: 'coordinates'; // writes output to "coordinates.kml
}
```

## Future additions

- support for multiple photos in a directory
- CLI support
