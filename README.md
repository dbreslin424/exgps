# exgps

[![Build Status](https://travis-ci.org/dbreslin424/exgps.svg?branch=master)](https://travis-ci.org/dbreslin424/exgps) [![Coverage Status](https://coveralls.io/repos/github/dbreslin424/exgps/badge.svg?branch=master)](https://coveralls.io/github/dbreslin424/exgps?branch=master)

Photo GPS coordinate extractor tool that generates KML files

## Installation

`npm install exgps`

## Usage

`exgps` takes a file path to an image file with EXIF data, then outputs a KML document containing GPS coordinates.

Example _app.js_

```javascript
const exgps = require('exgps');

// image file
exgps.run('/path/to/image.jpg', [options]);

// folder containing images
exgps.run('/path/to/images/', [options]);
```

## Options

```javascript
{
  // writes output to "coordinates.kml. If not provided, KML document will be logged to the console
  outputFile: 'coordinates';
}
```

## Output

KML file structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Placemark>
    <name>filename1</name>
    <TimeStamp>
      <when>[ISO timestamp]</when>
    </TimeStamp>
    <Point>
      <coordinates>[longitude],[latitude],[altitude</coordinates>
    </Point>
  </Placemark>
  <Placemark>
    <name>filename2</name>
    <TimeStamp>
      <when>[ISO timestamp]</when>
    </TimeStamp>
    <Point>
      <coordinates>[longitude],[latitude],[altitude</coordinates>
    </Point>
  </Placemark>
</kml>
```

## Future additions

- additional KML features
- CLI support
